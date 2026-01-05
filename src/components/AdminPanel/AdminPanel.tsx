
import { ViewBooksButton } from "./ViewBooksBtn";
function AdminPanel() {

  return (
    <div className="admin-panel">
      <h2 className="admin-panel-title">Admin Panel</h2>
      <p className="admin-panel-description">
        This section is only accessible to authenticated users.
      </p>
      <ViewBooksButton/>
    </div>
  );
}

export default AdminPanel;