import Filters from "./components/filters";
import ReportDetails from "./components/report-details";
import ReportList from "./components/report-list";

class FinancialReportPage {
    filters = new Filters();
    reportList = new ReportList();
    reportDetails = new ReportDetails();

}

export default FinancialReportPage;