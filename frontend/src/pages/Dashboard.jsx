import SearchUser from "../components/SearchUser";
import useApiData from "../hooks/useApiData";

const Dashboard = () => {
  const { data, loading } = useApiData();
  if (loading) {
    return <>Loading........</>;
  }
  return (
    <>
      <div className="flex justify-between m-10">
        <div>Payment APP</div>
        <div>Hello,{data.firstname}</div>
      </div>
      <div className="m-10">Balance : {data.balance}</div>
      <SearchUser />
    </>
  );
};

export default Dashboard;
