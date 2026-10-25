
:root {
  --bg: #f4f6fa;
  --surface: #ffffff;
  --text: #172033;
  --muted: #758096;
  --border: #e6eaf1;
  --accent: #6256e8;
  --accent-dark: #4d42ce;
  --green: #13866c;
  --shadow: 0 8px 30px rgba(24, 36, 65, 0.06);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
  color: var(--text);
  background: var(--bg);
}

button,
input,
select {
  font: inherit;
}

button,
select {
  cursor: pointer;
}

a {
  color: var(--accent);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.app {
  display: grid;
  grid-template-columns: 355px minmax(0, 1fr);
  min-height: 100vh;
  padding: 18px;
  gap: 18px;
}

.sidebar,
.map-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: var(--shadow);
  min-width: 0;
}

.sidebar {
  display: flex;
  flex-direction: column;
  padding: 22px;
  min-height: calc(100vh - 36px);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 23px;
  border-bottom: 1px solid var(--border);
}

.brand-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 13px;
  color: white;
  background: linear-gradient(135deg, #6256e8, #8c69f2);
  font-size: 22px;
  font-weight: 800;
}

.brand h1 {
  margin: 0;
  font-size: 17px;
  letter-spacing: -0.4px;
}

.brand p {
  margin: 5px 0 0;
  color: var(--muted);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.3px;
}

.intro {
  padding: 27px 0 20px;
}

.eyebrow {
  color: var(--accent);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.4px;
}

.intro h2 {
  margin: 10px 0 8px;
  font-size: 25px;
  line-height: 1.2;
  letter-spacing: -0.8px;
}

.intro p {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.65;
}

.stats {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 17px;
  background: #f8f8ff;
  border: 1px solid #ecebff;
  border-radius: 13px;
}

.stat-label {
  display: block;
  margin-bottom: 5px;
  color: var(--muted);
  font-size: 11px;
}

.stats strong {
  font-size: 28px;
  letter-spacing: -1px;
}

.status-badge {
  padding: 7px 9px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 750;
  white-space: nowrap;
}

.status-badge.loading {
  background: #fff2d8;
  color: #97620b;
}

.status-badge.success {
  background: #e0f7ef;
  color: #087653;
}

.status-badge.error {
  background: #ffebeb;
  color: #b42332;
}

.controls {
  display: grid;
  gap: 9px;
  padding: 23px 0;
}

.controls label {
  margin-top: 5px;
  font-size: 12px;
  font-weight: 750;
}

.controls input,
.controls select {
  width: 100%;
  min-height: 43px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  outline: none;
  background: #fff;
  color: var(--text);
  font-size: 12px;
}

.controls input:focus,
.controls select:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(98, 86, 232, 0.1);
}

.button-row {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 9px;
  margin-top: 7px;
}

.primary-button,
.secondary-button {
  min-height: 40px;
  padding: 10px;
  border: 0;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 750;
  transition: background 0.2s, transform 0.2s;
}

.primary-button {
  color: #fff;
  background: var(--accent);
}

.primary-button:hover {
  background: var(--accent-dark);
}

.secondary-button {
  color: var(--text);
  background: #eef0f6;
}

.secondary-button:hover {
  background: #e2e5ef;
}

button:active {
  transform: scale(0.98);
}

button:disabled {
  cursor: wait;
  opacity: 0.65;
}

.results-section {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 160px;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.section-heading h3 {
  margin: 0;
  font-size: 14px;
}

.section-heading span {
  color: var(--muted);
  font-size: 11px;
}

.status-message {
  margin: 11px 0;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.6;
}

.station-list {
  display: grid;
  align-content: start;
  gap: 7px;
  max-height: 310px;
  overflow-y: auto;
}

.station-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  padding: 11px;
  text-align: left;
  color: var(--text);
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 10px;
}

.station-item:hover,
.station-item:focus-visible {
  background: #f8f7ff;
  border-color: #d9d4ff;
  outline: none;
}

.category-dot {
  flex: 0 0 auto;
  width: 10px;
  height: 10px;
  margin-top: 4px;
  border-radius: 50%;
}

.station-item-info {
  display: grid;
  gap: 4px;
  min-width: 0;
}

.station-item-name {
  overflow-wrap: anywhere;
  font-size: 12px;
  font-weight: 750;
}

.station-item-meta {
  color: var(--muted);
  font-size: 10px;
  line-height: 1.4;
}

.empty-state {
  padding: 18px 10px;
  color: var(--muted);
  text-align: center;
  font-size: 12px;
  line-height: 1.6;
}

.sidebar-footer {
  padding-top: 16px;
  margin-top: 18px;
  border-top: 1px solid var(--border);
}

.sidebar-footer p {
  margin: 5px 0;
  color: var(--muted);
  font-size: 10px;
  line-height: 1.5;
}

.map-panel {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: calc(100vh - 36px);
}

.map-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 21px 24px;
  border-bottom: 1px solid var(--border);
}

.map-heading h2 {
  margin: 6px 0 0;
  font-size: 21px;
  letter-spacing: -0.5px;
}

.map-tag {
  display: inline-block;
  padding: 8px 11px;
  border: 1px solid var(--border);
  border-radius: 9px;
  color: var(--muted);
  font-size: 11px;
  font-weight: 650;
}

#map {
  flex: 1;
  min-height: 560px;
  background: #e8edf3;
}

.map-footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  padding: 13px 20px;
  color: var(--muted);
  font-size: 10px;
  line-height: 1.5;
  border-top: 1px solid var(--border);
}

.leaflet-popup-content-wrapper {
  border-radius: 12px;
}

.popup-title {
  margin: 0 0 9px;
  font-size: 15px;
}

.popup-row {
  margin: 5px 0;
  color: #465168;
  font-size: 12px;
  line-height: 1.5;
}

.popup-note {
  margin-top: 9px;
  color: #758096;
  font-size: 10px;
}

@media (max-width: 950px) {
  .app {
    grid-template-columns: 300px minmax(0, 1fr);
    padding: 10px;
    gap: 10px;
  }

  .sidebar {
    padding: 16px;
  }

  .map-heading {
    padding: 18px;
  }
}

@media (max-width: 700px) {
  .app {
    grid-template-columns: 1fr;
  }

  .sidebar,
  .map-panel {
    min-height: auto;
  }

  .station-list {
    max-height: 250px;
  }

  #map {
    min-height: 60vh;
  }

  .map-footer {
    flex-direction: column;
  }
}
