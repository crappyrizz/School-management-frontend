import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  User, Mail, Phone, Lock, Eye, EyeOff,
  GraduationCap, BookOpen, Users, Settings, CheckCircle, Circle
} from 'lucide-react'
import { useAuth } from '../AuthContext'

const ROLES = [
  { key: 'STUDENT', label: 'Student', sub: 'Learner access', icon: GraduationCap },
  { key: 'TEACHER', label: 'Teacher', sub: 'Class management', icon: BookOpen },
  { key: 'PARENT', label: 'Parent', sub: 'Monitor progress', icon: Users },
  { key: 'ADMIN', label: 'Administrator', sub: 'Full access', icon: Settings },
]

const PASSWORD_REQUIREMENTS = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { label: 'One number', test: (p) => /[0-9]/.test(p) },
  { label: 'One special character', test: (p) => /[^A-Za-z0-9]/.test(p) },
]

function getStrength(password) {
  const met = PASSWORD_REQUIREMENTS.filter((r) => r.test(password)).length
  if (met === 0) return { level: 0, label: '', color: '' }
  if (met === 1) return { level: 1, label: 'Weak', color: '#e24b4a' }
  if (met === 2) return { level: 2, label: 'Fair', color: '#F4B41A' }
  if (met === 3) return { level: 3, label: 'Good', color: '#639922' }
  return { level: 4, label: 'Strong', color: '#1B2A4A' }
}

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [role, setRole] = useState('STUDENT')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const strength = useMemo(() => getStrength(password), [password])
  const requirements = useMemo(
    () => PASSWORD_REQUIREMENTS.map((r) => ({ ...r, met: r.test(password) })),
    [password]
  )

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (strength.level < 2) {
      setError('Please choose a stronger password.')
      return
    }
    setLoading(true)
    try {
      // Combines first + last name since API accepts a single "name" field.
      // Role is captured but not yet sent — update when backend adds role support.
      const fullName = `${firstName} ${lastName}`.trim()
      await register(fullName, email, phoneNumber || undefined, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Top bar */}
        <div style={styles.topBar}>
          <div style={styles.topLogo}>
            <div style={styles.topIcon}>
              <GraduationCap size={16} color="#1B2A4A" />
            </div>
            <span style={styles.topName}>SchoolHub</span>
          </div>
          <Link to="/login" style={styles.topLink}>Already registered? Sign in →</Link>
        </div>

        {/* Form body */}
        <div style={styles.body}>
          <h1 style={styles.title}>Create your account</h1>
          <p style={styles.subtitle}>Join our educational community today</p>

          <form onSubmit={handleSubmit} noValidate>

            {/* Name row */}
            <div style={styles.twoCol}>
              <div className="field-group">
                <label className="field-label">First name</label>
                <div className="field-wrap">
                  <span className="field-icon"><User size={15} /></span>
                  <input
                    className="field-input"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>
              <div className="field-group">
                <label className="field-label">Last name</label>
                <div className="field-wrap">
                  <span className="field-icon"><User size={15} /></span>
                  <input
                    className="field-input"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="field-group" style={{ marginBottom: 14 }}>
              <label className="field-label">Email address</label>
              <div className="field-wrap">
                <span className="field-icon"><Mail size={15} /></span>
                <input
                  className="field-input"
                  type="email"
                  placeholder="john.doe@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="field-group" style={{ marginBottom: 14 }}>
              <label className="field-label">
                Phone number <span className="optional">(Optional)</span>
              </label>
              <div className="field-wrap">
                <span className="field-icon"><Phone size={15} /></span>
                <input
                  className="field-input"
                  type="tel"
                  placeholder="+254 700 000 000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            {/* Role selector */}
            <div style={{ marginBottom: 14 }}>
              <span className="field-label" style={{ display: 'block', marginBottom: 8 }}>Select role</span>
              <div style={styles.roleGrid}>
                {ROLES.map(({ key, label, sub, icon: Icon }) => (
                  <div
                    key={key}
                    style={{
                      ...styles.roleCard,
                      ...(role === key ? styles.roleCardSelected : {}),
                    }}
                    onClick={() => setRole(key)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setRole(key)}
                    aria-pressed={role === key}
                  >
                    <div style={{
                      ...styles.roleIcon,
                      background: role === key ? 'rgba(45,95,138,0.12)' : '#f0f4f8',
                    }}>
                      <Icon size={15} color={role === key ? '#2D5F8A' : '#6C757D'} />
                    </div>
                    <div>
                      <div style={styles.roleLabel}>{label}</div>
                      <div style={styles.roleSub}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Password */}
            <div className="field-group" style={{ marginBottom: 14 }}>
              <label className="field-label">Password</label>
              <div className="field-wrap">
                <span className="field-icon"><Lock size={15} /></span>
                <input
                  className="field-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
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
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              {/* Strength bar */}
              {password.length > 0 && (
                <>
                  <div style={styles.strengthBar}>
                    {[1, 2, 3, 4].map((seg) => (
                      <div
                        key={seg}
                        style={{
                          ...styles.strengthSeg,
                          background: seg <= strength.level ? strength.color : '#E9ECEF',
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: strength.color }}>
                      {strength.label}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Confirm password */}
            <div className="field-group" style={{ marginBottom: 14 }}>
              <label className="field-label">Confirm password</label>
              <div className="field-wrap">
                <span className="field-icon"><Lock size={15} /></span>
                <input
                  className="field-input"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="field-error">Passwords do not match.</p>
              )}
            </div>

            {/* Requirements checklist */}
            <div style={styles.reqBox}>
              <p style={styles.reqTitle}>Password must include</p>
              {requirements.map(({ label, met }) => (
                <div key={label} style={styles.reqItem}>
                  {met
                    ? <CheckCircle size={13} color="#3B6D11" />
                    : <Circle size={13} color="#bbb" />}
                  <span style={{ color: met ? '#3B6D11' : '#aaa', fontSize: 12 }}>{label}</span>
                </div>
              ))}
            </div>

            {error && <p className="field-error" style={{ marginBottom: 12 }}>{error}</p>}

            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? <span className="spinner" /> : 'Create account'}
            </button>

            <p style={styles.terms}>
              By signing up, you agree to our{' '}
              <Link to="#" style={styles.termsLink}>Terms of Service</Link>
              {' '}and{' '}
              <Link to="#" style={styles.termsLink}>Privacy Policy</Link>
            </p>
          </form>
        </div>
      </div>

      <p style={styles.pageFooter}>© 2026 SchoolHub. All rights reserved.</p>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0f4f8 0%, #e8f0f7 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 16px',
  },
  card: {
    background: '#fff',
    borderRadius: 14,
    border: '0.5px solid #e2e8f0',
    width: '100%',
    maxWidth: 540,
    overflow: 'hidden',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 24px',
    borderBottom: '0.5px solid #e2e8f0',
  },
  topLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  topIcon: {
    width: 28,
    height: 28,
    background: '#F4B41A',
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topName: {
    fontSize: 15,
    fontWeight: 700,
    color: '#1B2A4A',
  },
  topLink: {
    fontSize: 13,
    color: '#2D5F8A',
    fontWeight: 500,
    textDecoration: 'none',
  },
  body: {
    padding: '28px 28px 24px',
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: '#1B2A4A',
    marginBottom: 4,
    letterSpacing: '-0.3px',
  },
  subtitle: {
    fontSize: 13,
    color: '#6C757D',
    marginBottom: 24,
  },
  twoCol: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 14,
    marginBottom: 14,
  },
  roleGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 8,
  },
  roleCard: {
    border: '1.5px solid #E9ECEF',
    borderRadius: 8,
    padding: '10px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    cursor: 'pointer',
    background: '#fff',
    transition: 'border-color 0.15s, background 0.15s',
  },
  roleCardSelected: {
    background: '#EBF3FB',
    borderColor: '#2D5F8A',
  },
  roleIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'background 0.15s',
  },
  roleLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: '#1B2A4A',
  },
  roleSub: {
    fontSize: 11,
    color: '#6C757D',
  },
  strengthBar: {
    display: 'flex',
    gap: 4,
    marginTop: 6,
    marginBottom: 3,
  },
  strengthSeg: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    transition: 'background 0.3s',
  },
  reqBox: {
    background: '#F8F9FA',
    border: '0.5px solid #E9ECEF',
    borderRadius: 8,
    padding: '10px 14px',
    marginBottom: 14,
  },
  reqTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: '#6C757D',
    marginBottom: 7,
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  },
  reqItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    marginBottom: 4,
  },
  terms: {
    textAlign: 'center',
    fontSize: 12,
    color: '#6C757D',
    marginTop: 12,
  },
  termsLink: {
    color: '#2D5F8A',
    textDecoration: 'none',
  },
  pageFooter: {
    marginTop: 16,
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
  },
}
