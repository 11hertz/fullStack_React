import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/' replace>
            Home
          </Link>
        </li>
        <li>
          <Link to='/ttt'>TTT</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/my'>My</Link>
        </li>
        <li>
          <Link to='/items'>Items</Link>
        </li>
        <li>
          <Link to='/hello'>Hello</Link>
        </li>
      </ul>
    </nav>
  );
};
