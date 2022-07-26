import { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FormInput, Button } from 'shards-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { classNames } from '/util';

import './Search.scss';

const Search = ({
  onSubmit,
  expand,
  placeholder,
  expandedPlaceholder,
  dark = false,
  className = '',
}) => {
  const { t } = useTranslation();
  const [defaultPlaceholder, setDefaultPlaceholder] = useState(placeholder);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (
      placeholder !== defaultPlaceholder
      || expandedPlaceholder !== defaultPlaceholder
    ) setDefaultPlaceholder(placeholder);
  }, [defaultPlaceholder, expandedPlaceholder, placeholder]);

  const onFocus = useCallback(() => {
    if (!expand) {
      return;
    }

    setFocused(true);
    setDefaultPlaceholder(expandedPlaceholder);
  }, [expand, expandedPlaceholder]);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (expand) {
      setFocused(false);
      setDefaultPlaceholder(placeholder);
    }

    if (value) onSubmit(value);
  };

  const inputClass = classNames({
    focused,
  });

  return (
    <form
      onSubmit={onSearchSubmit}
      className={`d-flex search-form ${dark && 'dark'} ${className}`}
    >
      <FormInput
        id="search"
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={onFocus}
        onBlur={() => { setFocused(false); setDefaultPlaceholder(placeholder); }}
        placeholder={t(defaultPlaceholder)}
        className={inputClass}
      />
      <Button id="search-button" theme="light" onClick={onSearchSubmit} disabled={!value}>
        <FontAwesomeIcon icon={faSearch} size="1x" />
      </Button>
    </form>
  );
};

Search.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  expand: PropTypes.bool,
  expandedPlaceholder: PropTypes.string,
  dark: PropTypes.bool,
  className: PropTypes.string,
};

Search.defaultProps = {
  expand: false,
  expandedPlaceholder: '',
  dark: false,
  className: '',
};

export default Search;
