// /* eslint-disable eqeqeq */
// import { View } from 'react-native';
// import { MainLayout, MainGrid } from '../../../../components';
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import { useDropDown } from '../../../../hooks/useDropDownData';
// import EmploymentLang from '../../../../constants/Lang/Maintenance/WorkOrders/EmploymentLang';
// import { useGlobalContext } from '../../../../context/GlobalProvider';
// import { useState } from 'react';

// const Approvals = () => {
//   const {
//     TradeID,
//     WorkorderID,
//     FailureDescription,
//     WorkorderCode,
//     WorkorderName,
//     WorkorderTypeID,
//     WorkorderTypeName,
//     WorkorderStatusName,
//     preventCrud,
//     WorkorderStatusID,
//   } = useLocalSearchParams();

//   const { Lang, DepartmentID, user, company } = useGlobalContext(); // Get the current language from global context
//   const [CentralTeam, setCentralTeam] = useState(false);
//   const router = useRouter();

//   const { data: employeetList } = useDropDown(
//     'ms_Employees_ListForWo',
//     {
//       DepartmentID,
//       UserName:user.username,
//       LangID:Lang
//     },
//     'StaffID',
//     'StaffName'
//   );


//   return (
//     <MainLayout title={EmploymentLang.PageTitle[Lang]} className="">
//       <View className="flex-1">
//         <MainGrid
//           pk={'WorkorderLaborID'}
//           spTrx={'api_ms_WorkorderApprovals_Trx'}
//           spIns={'api_ms_WorkorderApprovals_Ins'}
//           spUpd={'api_ms_WorkorderApprovals_Upd'}
//           spDel={'api_ms_WorkorderApprovals_Del'}
//           TrxParam={[
//             // { name: 'DepartmentID', value: DepartmentID },
//             { name: 'WorkorderID', value: WorkorderID },
//             { name: 'LangID', value: Lang },
//             { name: 'UserName', value: user.username },
//           ]}
//           hasCrud={parseInt(WorkorderStatusID) < 3 || parseInt(WorkorderStatusID) == 5}
//           DelParam={[
//             {
//               rowData: true,
//               name: 'WorkorderLaborID',
//               value: 'WorkorderLaborID',
//             },
//             // { name: 'DepartmentID', value: DepartmentID },
//             { name: 'WorkorderID', value: WorkorderID },
//           ]}
//           UpdBody={[
//             { rowData: true },
//             { name: 'EmployeeID', value: 'EmployeeID' },
//             { name: 'DepartmentID', value: DepartmentID },
//             { name: 'WorkorderID', value: WorkorderID },
//           ]}
//           InsBody={{ DepartmentID: DepartmentID, WorkorderID: WorkorderID }}
//           TrxDependency={[WorkorderID]}
//           StaticWidth
//           tableHead={[
//             {
//               key: 'WorkorderID',
//             },
//             {
//               key: 'EmployeeID',
//               label: EmploymentLang.TableHeaders.Employee[Lang],
//               type: 'dropdown',
//               options: employeetList,
//               input: 'true',
//             },
//             {
//               key: 'StaffName',
//               label: EmploymentLang.TableHeaders.Employee[Lang],
//               visible: 'true',
//               width: 150,
//             },
//             {
//               key: 'Remarks',
//               label: EmploymentLang.TableHeaders.Remarks[Lang],
//               input: true,
//               visible: true,
//               width: 250,
//             },
          
//           ]}
//         />
//       </View>
//     </MainLayout>
//   );
// };

// export default Approvals;