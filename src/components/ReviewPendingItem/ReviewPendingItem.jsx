import PropTypes from 'prop-types';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faEllipsisVertical,
  faListCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'shards-react';
import { useHistory } from 'react-router-dom';
import { useToggle } from '/hooks';

import './ReviewPendingItem.scss';

const ReviewPendingItem = ({ type, data }) => {
  const history = useHistory();

  const [dropdownOpen, toggleDropdown] = useToggle(false);

  return (
    <div className='review-pending-item' role='button' onClick={() => history.push(`moderate/${data.id}`)}>
      <div className='review-pending-item-type'>
        {type === 'project' && (
          <FontAwesomeIcon icon={faListCheck} size='lg' color='#4285f4' />
        )}
        {type === 'user' && (
          <FontAwesomeIcon icon={faUser} size='lg' color='#008140' />
        )}
      </div>
      <div className='review-pending-item-name'>{data.title}</div>
      <div className='review-pending-item-user'>{data.user}</div>
      <div className='review-pending-item-last-opened'>
        {data.date}
      </div>

      <Dropdown open={dropdownOpen} toggle={toggleDropdown} className='active'>
        <DropdownToggle nav>
          <button className='review-pending-item-menu'>
            <FontAwesomeIcon icon={faEllipsisVertical} size='lg' color='#777' />
          </button>
        </DropdownToggle>
        <CSSTransition classNames='fade' timeout={200} in={dropdownOpen}>
          <DropdownMenu persist right>
            <DropdownItem onClick={() => {}}>some action</DropdownItem>
          </DropdownMenu>
        </CSSTransition>
      </Dropdown>
    </div>
  );
};

ReviewPendingItem.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReviewPendingItem;
