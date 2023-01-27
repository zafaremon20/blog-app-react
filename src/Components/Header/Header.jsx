import React from 'react'
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase.config';

export default function Header() {
  const [user, gloading] = useAuthState(auth);
  const [signOut, loading] = useSignOut(auth);
  const navigate = useNavigate();
  if (loading || gloading) {
    return <p className='text-3xl p-4'>Loading...</p>
  }
  const logout = () => {
    signOut(auth);
    navigate('/login');
  };
  return (
    <div className="navbar bg-base-200 sticky top-0 z-50 md:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to='/'>Home</Link></li>
            <li>
              <Link to='/blogs'>
                Blog
              </Link>
            </li>
            <li><Link to='/post'>Create Post</Link></li>
          </ul>
        </div>
        <Link to='/' className="btn btn-ghost normal-case text-xl">BlogX</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to='/home'>Home</Link></li>
          <li>
            <Link to='/blogs'>
              Blog
            </Link>
          </li>
          {user ? <li><Link to='/post'>Create Post</Link></li> : <li><Link to='/login'>Create Post</Link></li>}
        </ul>
      </div>
      <div className="navbar-end">
        {!user ?
          <Link to='/login' className="btn">Login</Link>
          :
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL} alt={user.displayName.split(' ')[0]} />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link to='/profile' className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to=''>Settings</Link></li>
              <li><button onClick={logout}>Logout</button></li>
            </ul>
          </div>
        }
      </div>
    </div>

  )
}
