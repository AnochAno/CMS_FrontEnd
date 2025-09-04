import { Row, Col, Form, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Filters({ view, setView }) {
  const renderTooltip = (msg) => (
    <Tooltip>{msg}</Tooltip>
  );

  return (
    <Row className="bg-white p-3 rounded shadow-sm mb-4">
      <Col md={3} sm={6} className="mb-2">
        <OverlayTrigger
          placement="top"
          overlay={renderTooltip("This filter is currently disabled")}
        >
          <div>
            <Form.Select disabled>
              <option>In progress</option>
              <option>Completed</option>
            </Form.Select>
          </div>
        </OverlayTrigger>
      </Col>

      <Col md={3} sm={6} className="mb-2">
        <OverlayTrigger
          placement="top"
          overlay={renderTooltip("Search is temporarily disabled")}
        >
          <div>
            <Form.Control type="text" placeholder="Search" disabled />
          </div>
        </OverlayTrigger>
      </Col>

      <Col md={3} sm={6} className="mb-2">
        <OverlayTrigger
          placement="top"
          overlay={renderTooltip("Sorting is temporarily disabled")}
        >
          <div>
            <Form.Select disabled>
              <option>Sort by name</option>
              <option>Newest</option>
            </Form.Select>
          </div>
        </OverlayTrigger>
      </Col>

      <Col md={3} sm={6} className="mb-2">
        <Form.Select
          value={view}
          onChange={(e) => setView(e.target.value)}
        >
          <option value="card">Card view</option>
          <option value="list">List view</option>
        </Form.Select>
      </Col>
    </Row>
  );
}
