export default function AdminTabs({ tabs, activeTab, setActiveTab }) {
    return (
      <nav className="admin-panel__nav">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`admin-panel__tab ${activeTab === tab ? 'admin-panel__tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>
    );
  }
  