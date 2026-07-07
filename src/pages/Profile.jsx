import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Phone, ArrowLeft, GraduationCap, LogOut } from 'lucide-react'
import { useAuth } from '../AuthContext'
import { apiFetch, ENDPOINTS } from '../api'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)
    try {
      // PATCH /api/v1/users/update/{id} — appends the user's ID to the path
      await apiFetch(`${ENDPOINTS.updateUser}/${user?.id}`, {
        method: 'PUT',
        body: { name, email, phoneNumber },
      })
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div style={styles.page}>

      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.navLogo}>
          <div style={styles.navIcon}>
            <GraduationCap size={18} color="#1B2A4A" />
          </div>
          <span style={styles.navName}>SchoolHub</span>
        </div>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={16} />
          <span>Log out</span>
        </button>
      </nav>

      <main style={styles.main}>

        {/* Back link */}
        <Link to="/dashboard" style={styles.backLink}>
          <ArrowLeft size={15} />
          Back to dashboard
        </Link>

        <div style={styles.card}>
          {/* Avatar */}
          <div style={styles.avatarSection}>
            <div style={styles.avatar}>
              {name
                ? name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
                : <User size={28} color="#2D5F8A" />}
            </div>
            <div>
              <h1 style={styles.cardTitle}>Your profile</h1>
              <p style={styles.cardSub}>Update your personal information</p>
            </div>
          </div>

          <div style={styles.divider} />

          <form onSubmit={handleSubmit} noValidate>

            {/* Full name */}
            <div className="field-group" style={{ marginBottom: 16 }}>
              <label className="field-label">Full name</label>
              <div className="field-wrap">
                <span className="field-icon"><User size={16} /></span>
                <input
                  className="field-input"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="field-group" style={{ marginBottom: 16 }}>
              <label className="field-label">Email address</label>
              <div className="field-wrap">
                <span className="field-icon"><Mail size={16} /></span>
                <input
                  className="field-input"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="field-group" style={{ marginBottom: 24 }}>
              <label className="field-label">
                Phone number <span className="optional">(Optional)</span>
              </label>
              <div className="field-wrap">
                <span className="field-icon"><Phone size={16} /></span>
                <input
                  className="field-input"
                  type="tel"
                  placeholder="+254 700 000 000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="field-error" style={{ marginBottom: 12 }}>{error}</p>}
            {success && (
              <p style={{ color: '#3B6D11', fontSize: 13, marginBottom: 12, fontWeight: 500 }}>
                Profile updated successfully.
              </p>
            )}

            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? <span className="spinner" /> : 'Save changes'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#F8F9FA',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    height: 60,
    background: '#fff',
    borderBottom: '0.5px solid #E9ECEF',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  navLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
  },
  navIcon: {
    width: 32,
    height: 32,
    background: '#F4B41A',
    borderRadius: 7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navName: {
    fontSize: 17,
    fontWeight: 700,
    color: '#1B2A4A',
    letterSpacing: '-0.3px',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '7px 14px',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    color: '#6C757D',
    background: 'none',
    border: '1px solid #E9ECEF',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  main: {
    maxWidth: 520,
    margin: '0 auto',
    padding: '32px 24px',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 13,
    color: '#6C757D',
    textDecoration: 'none',
    marginBottom: 20,
    fontWeight: 500,
  },
  card: {
    background: '#fff',
    border: '0.5px solid #E9ECEF',
    borderRadius: 14,
    padding: '28px',
  },
  avatarSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: '#EBF3FB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 700,
    color: '#2D5F8A',
    flexShrink: 0,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: '#1B2A4A',
    marginBottom: 3,
    letterSpacing: '-0.3px',
  },
  cardSub: {
    fontSize: 13,
    color: '#6C757D',
  },
  divider: {
    height: '0.5px',
    background: '#E9ECEF',
    marginBottom: 20,
  },
}
