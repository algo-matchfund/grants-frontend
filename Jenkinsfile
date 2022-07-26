//  The `REPOSITORY_NAME` should be set to the name of the repository without
//  the `.git` extension. This makes sure that the name of the generated Docker
//  images will reflect the name of the repository. If you use something else,
//  things should still work (unless you set it to the name of another
//  repository name in use), but you will most probably confuse other people
//  when they are looking for the Docker images.
def REPOSITORY_NAME = "grants-frontend"

//  Registry settings
//
//  The `REGISTRY_HOST` is also used as the ID of the credentials to use for
//  the registry (stored in Jenkins).
def REGISTRY_HOST   = "registry.matchfund.app"
def REGISTRY_URL    = "https://${REGISTRY_HOST}"

//  The tag and full name of the image that will be created in the "Prepare"
//  step and will be used in the build stages. The same image name will be the
//  basis for naming the "build result images" too (see the
//  `createBuildResultImage()` function below).
//
//  NOTE:   The name of Docker images cannot contain uppercase letters, so we
//          convert the image name to lowercase. This is relevant for the "PR
//          jobs", as they are named based on the PR number (e.g. "PR-42"),
//          with uppercase "PR" in their name.
def CI_IMAGE_TAG    = "ci/${REPOSITORY_NAME}.${env.BRANCH_NAME}:build-${env.BUILD_NUMBER}".toLowerCase()
def CI_IMAGE_NAME      = "${REGISTRY_HOST}/${CI_IMAGE_TAG}"

//  Arguments for `docker run` that starts up the container running the builds
//  and tests.
def CI_IMAGE_ARGS

//  Number of workers for the tests
def PARALLEL_JOBS = 4

//  Unit test, coverage, and eslint report files
def UT_XML_REPORT       = "junit.xml"
def COV_XML_REPORT      = "cobertura-coverage.xml"
def ESLINT_XML_REPORT   = "eslint.xml"
def AUDIT_REPORT        = "npm-audit.json"

def testWithCoverage = {
    def jest_options = [
        "--ci",
        "--color=false",
        "--coverage",
        "--coverageDirectory=.",
        "--coverageReporters=cobertura",
        "--coverageReporters=text",
        "--reporters=jest-junit",
        "--reporters=default",
        "--maxWorkers=${PARALLEL_JOBS}",
        "--passWithNoTests",
    ].join(" ")

    sh "npm run test -- ${jest_options}"
}

def publishTestReport = {
    xunit(
        thresholds: [ failed(failureThreshold: "0") ],
        tools: [ JUnit(pattern: UT_XML_REPORT) ]
    )

    archiveArtifacts UT_XML_REPORT
}

def publishCoverageReport = {
    publishCoverage(
        adapters: [ coberturaAdapter(COV_XML_REPORT) ],
        failNoReports: true,
        calculateDiffForChangeRequests: true,
        failBuildIfCoverageDecreasedInChangeRequest: false,
    )

    archiveArtifacts COV_XML_REPORT
}

def lint = {
    def eslint_options = [
        "--no-color",
        "--format checkstyle",
        "--output-file ${ESLINT_XML_REPORT}",
    ].join(" ")

    //  NOTE:   Even if the linting fails, we don't want to make the build
    //          fail. So we add the `true` at the end to have a successful
    //          exit code.
    sh "npm run lint -- ${eslint_options} || true"
}

def publishEslintReport = {
    def report_id = "eslint"

    recordIssues(
        id: report_id,
        aggregatingResults: false,
        enabledForFailure: true,
        tools: [ esLint(id: report_id, name: report_id, pattern: ESLINT_XML_REPORT) ],
    )

    archiveArtifacts ESLINT_XML_REPORT
}

pipeline {
    agent none
    options {
        //  Skip the default checkout step. We will explicitly clone the
        //  repository in the "Prepare" stage and then `stash` the code. This
        //  way each subsequent stage can just simply `unstash` the source code
        //  without having to run several parallel clone operations.
        skipDefaultCheckout()
    }
    stages {

        stage("Prepare") {
            agent {
                //  The agent with the label `docker-agent` is the one that is
                //  permanently configured in Jenkins. This is just a
                //  bare-bones image that has just enough tools installed to be
                //  able to run a Jenkins agent and execute Docker commands
                //  (but no builds).
                label "docker-agent"
            }
            steps {
                //  Since default checkout is disabled above, explicitly clone
                //  the repository.
                checkout scm

                //  Create the Docker image based on the `ci/Dockerfile` and
                //  push it to our registry. This image will be used in the
                //  later build stages to run the actual builds and tests.
                script {
                    def jenkins_uid = sh(script: "id -u jenkins", returnStdout: true).trim()
                    def docker_gid = sh(script: "getent group docker | cut -f3 -d:", returnStdout: true).trim()
                    CI_IMAGE_ARGS = [
                        //  We need to mount `docker.sock` to be able to run docker commands (e.g.
                        //  `docker commit`) during the build.
                        "-v /var/run/docker.sock:/var/run/docker.sock",
                        // The user needs to match the `jenkins` user on the
                        // host and be in the docker group in order to access
                        // the docker socket.
                        "-u ${jenkins_uid}:${docker_gid}",
                    ].join(" ")
                    docker.withRegistry(REGISTRY_URL, REGISTRY_HOST) {
                        docker.build(CI_IMAGE_TAG, "-f ci/Dockerfile ci").push()
                    }
                }

                //  Save the repository contents for later, so that the build
                //  stages can get the source code with `unstash` instead of
                //  repeatedly cloning the repository.
                stash(name: "repo", includes: "**", useDefaultExcludes: false)
            }
        }

        stage("Dependencies") {
            agent {
                //  Use the Docker image created in the "Prepare" step
                docker {
                    image                   CI_IMAGE_NAME
                    args                    CI_IMAGE_ARGS
                    registryUrl             REGISTRY_URL
                    registryCredentialsId   REGISTRY_HOST
                }
            }
            steps {
                unstash "repo"
                timeout(time: 5, unit: "MINUTES") {
                    script {
                        sh "NO_COLOR=1 npm ci"
                    }
                }

                // Save the dependencies
                stash(name: "repo", includes: "**", useDefaultExcludes: false)
            }
        }

        stage("TestAndLint") {
            parallel {
                stage("Test") {
                    agent {
                        //  Use the Docker image created in the "Prepare" step
                        docker {
                            image                   CI_IMAGE_NAME
                            args                    CI_IMAGE_ARGS
                            registryUrl             REGISTRY_URL
                            registryCredentialsId   REGISTRY_HOST
                        }
                    }
                    steps {
                        unstash "repo"
                        timeout(time: 20, unit: "MINUTES") {
                            script {
                                testWithCoverage()
                            }
                        }
                    }
                    post {
                        always  { script {
                            publishTestReport()
                            publishCoverageReport()
                        } }
                    }
                }

                stage("Lint") {
                    agent {
                        //  Use the Docker image created in the "Prepare" step
                        docker {
                            image                   CI_IMAGE_NAME
                            args                    CI_IMAGE_ARGS
                            registryUrl             REGISTRY_URL
                            registryCredentialsId   REGISTRY_HOST
                        }
                    }
                    steps {
                        unstash "repo"
                        timeout(time: 10, unit: "MINUTES") {
                            script {
                                lint()
                            }
                        }
                    }
                    post {
                        always { script { publishEslintReport() } }
                    }
                }

                stage("Audit") {
                    agent {
                        //  Use the Docker image created in the "Prepare" step
                        docker {
                            image                   CI_IMAGE_NAME
                            args                    CI_IMAGE_ARGS
                            registryUrl             REGISTRY_URL
                            registryCredentialsId   REGISTRY_HOST
                        }
                    }
                    steps {
                        unstash "repo"
                        timeout(time: 10, unit: "MINUTES") {
                            script {
                                sh "set -o pipefail; npm audit --json | tee ${AUDIT_REPORT}"
                            }
                        }
                    }
                    post {
                        always { script { archiveArtifacts AUDIT_REPORT } }
                    }
                }

            }
        }

        stage("Publish") {
            agent {
                //  Use the Docker image created in the "Prepare" step
                docker {
                    image                   CI_IMAGE_NAME
                    args                    CI_IMAGE_ARGS
                    registryUrl             REGISTRY_URL
                    registryCredentialsId   REGISTRY_HOST
                }
            }
            steps {
                unstash "repo"
                timeout(time: 10, unit: "MINUTES") {
                    script {
                        sh "cmake -B build -S . -DPROD=ON && cmake --build build --target container-push"
                    }
                }
            }
        }
    }
}
