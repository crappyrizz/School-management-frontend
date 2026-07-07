import { useNavigate, Link } from 'react-router-dom'
import { GraduationCap, LogOut, User, BookOpen, Users, BarChart3, Settings } from 'lucide-react'
import { useAuth } from '../AuthContext'

// These cards represent future features. As your teammate adds more
// controllers to the backend, each card here will link to a real page.
const FEATURE_CARDS = [
  { icon: BookOpen, label: 'Courses', desc: 'Manage curriculum and subjects', color: '#EBF3FB', iconColor: '#2D5F8A', soon: true },
  { icon: Users, label: 'Students', desc: 'View and manage student records', color: '#EDF7ED', iconColor: '#3B6D11', soon: true },
  { icon: BarChart3, label: 'Reports', desc: 'Analytics and performance data', color: '#FEF9EC', iconColor: '#8a6000', soon: true },
  { icon: Settings, label: 'Settings', desc: 'System configuration', color: '#F8F9FA', iconColor: '#6C757D', soon: true },
]

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

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
        <div style={styles.navActions}>
          <Link to="/profile" style={styles.navLink}>
            <User size={16} />
            <span>Profile</span>
          </Link>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={16} />
            <span>Log out</span>
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main style={styles.main}>

        {/* Welcome banner */}
        <div style={styles.banner}>
          <div>
            <h1 style={styles.bannerTitle}>
              Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
            </h1>
            <p style={styles.bannerSub}>
              {user?.email && <span style={{ color: 'rgba(255,255,255,0.75)' }}>{user.email}</span>}
            </p>
          </div>
        </div>

        {/* Feature grid */}
        <h2 style={styles.sectionTitle}>Features</h2>
        <div style={styles.grid}>
          {FEATURE_CARDS.map(({ icon: Icon, label, desc, color, iconColor, soon }) => (
            <div key={label} style={styles.card}>
              <div style={{ ...styles.cardIcon, background: color }}>
                <Icon size={22} color={iconColor} />
              </div>
              <div style={styles.cardBody}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardLabel}>{label}</h3>
                  {soon && <span style={styles.badge}>Coming soon</span>}
                </div>
                <p style={styles.cardDesc}>{desc}</p>
              </div>
            </div>
          ))}
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
  navActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '7px 14px',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    color: '#1B2A4A',
    textDecoration: 'none',
    border: '1px solid #E9ECEF',
    background: '#fff',
    cursor: 'pointer',
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
    maxWidth: 900,
    margin: '0 auto',
    padding: '40px 24px',
  },
  banner: {
    background: 'linear-gradient(135deg, #1B2A4A 0%, #2D5F8A 100%)',
    borderRadius: 14,
    padding: '32px 36px',
    marginBottom: 36,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 700,
    marginBottom: 6,
    letterSpacing: '-0.3px',
  },
  bannerSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#1B2A4A',
    marginBottom: 16,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 14,
  },
  card: {
    background: '#fff',
    border: '0.5px solid #E9ECEF',
    borderRadius: 12,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    flex: 1,
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 5,
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: 600,
    color: '#1B2A4A',
  },
  badge: {
    fontSize: 10,
    fontWeight: 600,
    color: '#2D5F8A',
    background: '#EBF3FB',
    padding: '2px 7px',
    borderRadius: 50,
    letterSpacing: '0.3px',
  },
  cardDesc: {
    fontSize: 13,
    color: '#6C757D',
    lineHeight: 1.5,
  },
}
