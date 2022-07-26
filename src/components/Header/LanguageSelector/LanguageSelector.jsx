import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'shards-react';
import { CSSTransition } from 'react-transition-group';
import { useToggle } from '/hooks';

const languages = {
  en: 'English',
  // nl: 'Dutch',
};

const LanguageSelector = memo(() => {
  const { i18n } = useTranslation();

  const switchLanguage = useCallback((event) => {
    event.preventDefault();
    i18n.changeLanguage(event.target.value);
  }, [i18n]);

  const [open, toggle] = useToggle(false);

  return (
    <Dropdown
      id="language-selector"
      className="ml-auto mr-4"
      open={open}
      toggle={toggle}
    >
      <DropdownToggle theme="light" caret>
        {i18n.t(languages[new Intl.Locale(i18n.language).language])}
      </DropdownToggle>
      <CSSTransition classNames="fade" timeout={200} in={open}>
        <DropdownMenu persist right>
          {Object.entries(languages).map(([lang, langName]) => (
            <DropdownItem
              theme="secondary"
              disabled={lang === i18n.language}
              onClick={switchLanguage}
              key={`switch-lang-button-${lang}`}
              id={`switch-lang-button-${lang}`}
              value={lang}
            >
              {i18n.t(langName)}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </CSSTransition>
    </Dropdown>
  );
});

export default LanguageSelector;
