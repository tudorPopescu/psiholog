import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBug, faServer, faBriefcase, faFileAlt, faTools } from '@fortawesome/free-solid-svg-icons';

export const ADMIN_HEADER_LINKS = [
  {
    name: 'Utilizatori',
    path: '/users',
    icon: <FontAwesomeIcon icon={faUsers} />
  },
  {
    name: 'Erori',
    path: '/errors',
    icon: <FontAwesomeIcon icon={faBug} />
  },
  {
    name: 'Actiuni',
    path: '/actions',
    icon: <FontAwesomeIcon icon={faServer} />
  },
  {
    name: 'Drafts',
    dropdown: true,
    icon: <FontAwesomeIcon icon={faBriefcase} />,
    children: [
      {
        name: 'Sectoare bugetare',
        path: '/budgetarySector'
      },
      {
        name: 'Surse de finantare',
        path: '/financialSource'
      },
      {
        name: 'Activitati',
        path: '/activities'
      },
      {
        name: 'Cheltuieli',
        path: '/expenses'
      }
    ]
  },
  {
    name: 'Handlebars',
    path: '/handlebars',
    icon: <FontAwesomeIcon icon={faFileAlt} />
  },
  {
    name: 'Utilitati',
    dropdown: true,
    icon: <FontAwesomeIcon icon={faTools} />,
    children: [
      {
        name: 'Refresh utilizatori',
        path: '/refreshUsers'
      }
    ]
  }
];

export const CLIENT_HEADER_LINKS = [];
