'use client';

import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Magnifier, Person } from '@gravity-ui/icons';
import { addUser, loadUsers } from './lib/features/usersSlice';
import { useAppDispatch, useAppSelector } from './lib/store';

export default function Home() {
  const dispatch = useAppDispatch();
  const { items: users, status, creating, error } = useAppSelector((state) => state.users);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (status === 'idle') dispatch(loadUsers());
  }, [dispatch, status]);

  const query = search.trim().toLowerCase();
  const filteredUsers = query
    ? users.filter((user) => `${user.name} ${user.email}`.toLowerCase().includes(query))
    : users;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice('');

    try {
      await dispatch(addUser({ name: name.trim(), email: email.trim() })).unwrap();
      setName('');
      setEmail('');
      setNotice('User added to your directory.');
    } catch {
      setNotice('');
    }
  }

  return (
    <main className="directory-shell">
      <aside className="sidebar">
        <a className="brand" href="#directory" aria-label="Fieldnotes home">
          <span className="brand-mark">F</span>
          <span>fieldnotes<span className="brand-period">.</span></span>
        </a>

        <div className="workspace-label">WORKSPACE</div>
        <div className="workspace-switcher">
          <span className="workspace-avatar">S</span>
          <span className="workspace-name">Studio North</span>
          <span className="switcher-caret" aria-hidden="true">⌄</span>
        </div>

        <nav className="side-nav" aria-label="Workspace navigation">
          <div className="nav-caption">MANAGE</div>
          <a className="nav-link nav-link-active" href="#directory" aria-current="page">
            <Person aria-hidden="true" />
            <span>People</span>
            <span className="nav-count">{users.length}</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <span className={`service-indicator ${status === 'failed' ? 'service-indicator-error' : ''}`} />
          <span>{status === 'failed' ? 'Service unavailable' : 'People directory'}</span>
        </div>
      </aside>

      <section className="main-panel" id="directory">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><span className="breadcrumb-slash">/</span><strong>People</strong></div>
          <div className="topbar-meta"><span className="online-dot" /> Team workspace</div>
        </header>

        <div className="page-content">
          <div className="page-heading">
            <div>
              <div className="eyebrow">YOUR WORKSPACE</div>
              <h1>People<span className="heading-period">.</span></h1>
              <p className="page-description">The people who make good work happen.</p>
            </div>
            <div className="member-total">
              <span className="member-total-number">{users.length.toString().padStart(2, '0')}</span>
              <span className="member-total-label">{users.length === 1 ? 'PERSON' : 'PEOPLE'}</span>
            </div>
          </div>

          <div className="directory-grid">
            <section className="add-panel" aria-labelledby="add-heading">
              <div className="section-kicker"><span className="kicker-number">01</span> NEW MEMBER</div>
              <h2 id="add-heading">Add someone<br />to the team.</h2>
              <p className="form-intro">Create a member profile for your workspace.</p>

              <form className="user-form" onSubmit={handleSubmit}>
                <label htmlFor="user-name">Full name</label>
                <input
                  autoComplete="name"
                  id="user-name"
                  name="name"
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Jordan Lee"
                  required
                  value={name}
                />

                <label htmlFor="user-email">Email address</label>
                <input
                  autoComplete="email"
                  id="user-email"
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="jordan@studio.com"
                  required
                  type="email"
                  value={email}
                />

                {error && <p className="form-error" role="alert">{error}</p>}
                {notice && <p className="form-success" role="status">{notice}</p>}

                <button className="submit-button" disabled={creating} type="submit">
                  <span>{creating ? 'Adding person…' : 'Add to directory'}</span>
                  <span className="button-arrow" aria-hidden="true">↗</span>
                </button>
              </form>
              <div className="form-footnote"><span className="required-mark">*</span> All fields are required</div>
            </section>

            <section className="users-panel" aria-labelledby="users-heading">
              <div className="users-panel-header">
                <div>
                  <div className="section-kicker"><span className="kicker-number">02</span> DIRECTORY</div>
                  <h2 id="users-heading">All people <span className="heading-count">({users.length})</span></h2>
                </div>
                <label className="search-field">
                  <Magnifier aria-hidden="true" />
                  <input
                    aria-label="Search people"
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Find someone"
                    value={search}
                  />
                  <span className="search-shortcut" aria-hidden="true">⌕</span>
                </label>
              </div>

              <div className="user-table" role="table" aria-label="People in your workspace">
                <div className="table-head" role="row">
                  <span role="columnheader">PERSON</span>
                  <span role="columnheader">EMAIL ADDRESS</span>
                  <span role="columnheader">STATUS</span>
                </div>

                {status === 'loading' && users.length === 0 ? (
                  <div className="table-message" role="status">Loading your people…</div>
                ) : status === 'failed' && users.length === 0 ? (
                  <div className="table-message table-error">
                    <span>{error}</span>
                    <button className="retry-button" onClick={() => dispatch(loadUsers())} type="button">Try again</button>
                  </div>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <div className="user-row" key={user._id ?? user.email} role="row">
                      <div className="person-cell" role="cell">
                        <span className={`person-avatar avatar-${index % 4}`} aria-hidden="true">
                          {user.name.trim().charAt(0).toUpperCase()}
                        </span>
                        <span className="person-name">{user.name}</span>
                      </div>
                      <span className="email-cell" role="cell">{user.email}</span>
                      <span className="status-cell" role="cell">
                        <span className={`status-pill ${user.isActive === false ? 'status-pill-inactive' : ''}`}>
                          <span /> {user.isActive === false ? 'Inactive' : 'Active'}
                        </span>
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <span className="empty-icon"><Person aria-hidden="true" /></span>
                    <strong>{search ? 'No matches found' : 'A good team starts here.'}</strong>
                    <span>{search ? 'Try another name or email address.' : 'Add your first person using the form.'}</span>
                  </div>
                )}
              </div>

              <div className="table-footer">
                <span>Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> {users.length === 1 ? 'person' : 'people'}</span>
                <span className="data-source"><span className="data-source-dot" /> Live directory</span>
              </div>
            </section>
          </div>

          <footer className="page-footer"><span>FIELDNOTES / PEOPLE</span><span>BUILT FOR THE WORK THAT MATTERS</span></footer>
        </div>
      </section>
    </main>
  );
}