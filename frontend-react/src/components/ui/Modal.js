export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        minWidth: '300px',
        maxWidth: '90%',
        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
        position: 'relative'
      }}>
        <h2 style={{ marginTop: 0 }}>{title}</h2>
        <div>{children}</div>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'red',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '5px 10px',
            cursor: 'pointer'
          }}
        >
          X
        </button>
      </div>
    </div>
  );
}
