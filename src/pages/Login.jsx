import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, BookOpen, Users, BarChart3, GraduationCap } from 'lucide-react'
import { useAuth } from '../AuthContext'

const features = [
  { icon: BookOpen, text: 'Manage courses and curriculum' },
  { icon: Users, text: 'Track students and staff' },
  { icon: BarChart3, text: 'Reports and analytics' },
]

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      {/* LEFT — Branding panel */}
      <div style={styles.leftPanel}>
        <div style={styles.hexBg} />

        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <GraduationCap size={20} color="#1B2A4A" />
          </div>
          <span style={styles.logoText}>SchoolHub</span>
        </div>

        <h1 style={styles.tagline}>Empowering Education Through Technology</h1>

        <p style={styles.desc}>
          Streamline school operations, enhance learning experiences, and build
          a connected educational community.
        </p>

        <div style={styles.pillList}>
          {features.map(({ icon: Icon, text }) => (
            <div key={text} style={styles.pill}>
              <div style={styles.pillIcon}>
                <Icon size={14} color="#F4B41A" />
              </div>
              <span style={styles.pillText}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — Form panel */}
      <div style={styles.rightPanel}>
        <form style={styles.form} onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: 28 }}>
            <h2 style={styles.formTitle}>Welcome back</h2>
            <p style={styles.formSubtitle}>Sign in to continue to your account</p>
          </div>

          {/* Email */}
          <div className="field-group" style={{ marginBottom: 16 }}>
            <label className="field-label">Email address</label>
            <div className="field-wrap">
              <span className="field-icon"><Mail size={16} /></span>
              <input
                className={`field-input${error ? ' error' : ''}`}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="field-group" style={{ marginBottom: 12 }}>
            <label className="field-label">Password</label>
            <div className="field-wrap">
              <span className="field-icon"><Lock size={16} /></span>
              <input
                className={`field-input${error ? ' error' : ''}`}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Options row */}
          <div style={styles.optionsRow}>
            <label style={styles.remember}>
              <input type="checkbox" style={{ accentColor: '#2D5F8A' }} />
              Remember me
            </label>
            <Link to="#" style={styles.forgot}>Forgot password?</Link>
          </div>

          {/* Error */}
          {error && (
            <p className="field-error" style={{ marginBottom: 12 }}>{error}</p>
          )}

          {/* Submit */}
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Sign in'}
          </button>

          <p style={styles.footer}>
            Don't have an account?{' '}
            <Link to="/register" style={styles.footerLink}>Create account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

const styles = {
  page: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
  },
  leftPanel: {
    width: '50%',
    background: 'linear-gradient(135deg, #1B2A4A 0%, #2D5F8A 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '48px 48px',
    position: 'relative',
    overflow: 'hidden',
  },
  hexBg: {
    position: 'absolute',
    inset: 0,
    opacity: 0.06,
    backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
    backgroundSize: '28px 28px',
    pointerEvents: 'none',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 32,
    position: 'relative',
  },
  logoIcon: {
    width: 38,
    height: 38,
    background: '#F4B41A',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: '-0.3px',
  },
  tagline: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 600,
    lineHeight: 1.25,
    marginBottom: 16,
    letterSpacing: '-0.3px',
    position: 'relative',
  },
  desc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
    lineHeight: 1.65,
    marginBottom: 36,
    position: 'relative',
  },
  pillList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    position: 'relative',
  },
  pill: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: 'rgba(255,255,255,0.1)',
    border: '0.5px solid rgba(255,255,255,0.18)',
    borderRadius: 50,
    padding: '10px 18px',
  },
  pillIcon: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    background: 'rgba(244,180,26,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  pillText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: 500,
  },
  rightPanel: {
    width: '50%',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    overflowY: 'auto',
  },
  form: {
    width: '100%',
    maxWidth: 360,
  },
  formTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: '#1B2A4A',
    marginBottom: 6,
    letterSpacing: '-0.3px',
  },
  formSubtitle: {
    fontSize: 14,
    color: '#6C757D',
  },
  optionsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 4,
  },
  remember: {
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    fontSize: 13,
    color: '#555',
    cursor: 'pointer',
  },
  forgot: {
    fontSize: 13,
    color: '#2D5F8A',
    textDecoration: 'none',
    fontWeight: 500,
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 13,
    color: '#6C757D',
  },
  footerLink: {
    color: '#2D5F8A',
    fontWeight: 600,
    textDecoration: 'none',
  },
}
