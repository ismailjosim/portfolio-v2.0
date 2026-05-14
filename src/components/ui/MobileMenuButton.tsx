'use client';

export default function MobileMenuButton() {
  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sidebar?.classList.toggle('open');
    overlay?.classList.toggle('show');
  };

  return (
    <>
      <style>{`
				#sidebar-overlay {
					display: none;
					position: fixed;
					inset: 0;
					background: rgba(0, 0, 0, 0.5);
					z-index: 99;
					backdrop-filter: blur(2px);
				}
				#sidebar-overlay.show {
					display: block;
				}
			`}</style>
      <button id="mobile-nav-toggle" onClick={toggleSidebar} aria-label="Toggle menu">
        ☰
      </button>
    </>
  );
}
