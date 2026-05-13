import PageTitle from "@/components/PageTitle";
import { Col, Row } from "react-bootstrap";
import NewSignup from "./components/NewSignup";
import Stat from "./components/Stat";
import EmployeePerformance from "./components/EmployeePerformance";

const DashboardPage = () => {
  return (
    <>
      <PageTitle title="Dashboard" />

      <Row>
        <Col xl={6}>
          <Stat />
        </Col>
        <Col xl={6}>
          <EmployeePerformance />
        </Col>
      </Row>
      <Row>
        <Col xxl={6}>{/* <NewSignup /> */}</Col>
      </Row>
    </>
  );
};

export default DashboardPage;
