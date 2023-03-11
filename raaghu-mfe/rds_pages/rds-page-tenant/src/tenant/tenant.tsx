import React, { useState, useEffect } from "react";
import {
  createTenant,
  deleteTenant,
  editTenant,
  fetchEdition,
  fetchTenant,
  restoreToDefaultFeaturesEdition,
  saveFeaturesEdition,
  tenantFeaturesGet,
  tenantPut,
} from "../../../../libs/state-management/tenant/tenant-slice";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../libs/state-management/hooks";

import {
  RdsCompTenantList,
  RdsCompTenantInformation,
  RdsCompAlertPopup,
  RdsCompClaims,
} from "../../../rds-components";
import { RdsButton, RdsOffcanvas, RdsNavtabs } from "../../../rds-elements";
import {
  SaasTenantUpdateDto,
} from "../../../../libs/shared/service-proxy";
import RdsCompFeatures from "../../../../../raaghu-components/src/rds-comp-new-features/rds-comp-new-features";
import { useTranslation } from "react-i18next";

interface RdsPageTenantProps {}

const actions = [
  { id: "editTenant", displayName: "Edit", offId: "Edit" },
  { id: "delete", displayName: "Delete", modalId: "Del" },
];

const checkboxlabel = [
  {
    id: "1",
    label: "Shared Database",
    checked: false,
    name: "shared database",
  },
  {
    id: "2",
    label: "Separated Database",
    checked: false,
    name: "separated database",
  },
];

const Tenant = (props: RdsPageTenantProps) => {
  const data = useAppSelector((state) => state.persistedReducer.tenant);
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const [tableData, setTableData] = useState<any>([]);
  const [editionList, setEditionList] = useState<any>([]);
  const [featureIdentitySettingsData, setFeatureIdentitySettingsData] = useState<any>([{value:"Optional"},{value:3},{value:true},{value:true},{value:true},{value:true},{value:true},{value:true},{value:true},{value:true}]);
  const [tenantId, setTenantid] = useState<any>("")
  const [tenantInformationData, setTenantInformationData] = useState<any>({     
      editionId: "",
      name: "",
      activationEndDate: null,
      password: "",
      activationState: 0,
      adminEmailAddress: "",
      connectionStrings: { id: "", default: null, databases: [] },
    });
    const [basicTenantInformation , setBasicTenantInformation ] = useState<any>({     
      editionId: "",
      name: "",
      activationEndDate: null,
      password: "",
      activationState: 0,
      adminEmailAddress: "",
      connectionStrings: { id: "", default: null, databases: [] },
    })
  const tableHeaders = [
    {
      displayName: "Tenant",
      key: "tenant",
      datatype: "avatarTitleInfo",
      sortable: true,
    },
    {
      displayName: "Edition",
      key: "editionName",
      datatype: "text",
      sortable: true,
    },
    {
      displayName:"Status",
      key: "status",
      datatype: "badge",
      sortable: true,
    },
    {
      displayName: "Subscription End Date",
      key: "expiry",
      datatype: "text",
      sortable: true,
    },
  ];

  const navtabsItems = [
    { label: "Basics", tablink: "#nav-home", id: 0 },
    { label: "Features", tablink: "#nav-profile", id: 1 },
  ];
 

  const treeData: any[] = [];
  const offCanvasHandler = () => {
    // dispatch(fetchEdition() as any);
  };
  const [tableDataRowid, setTableDataRowId] = useState(0);

  const onActionHandler = (rowData: any, actionId: any) => {
    let id = rowData.id;
    setTableDataRowId(rowData.id);
    if (actionId == "editTenant") {
      dispatch(editTenant(id) as any).then((res:any)=>{
        dispatch(fetchEdition() as any);
        dispatch(fetchTenant as any);
      })
      dispatch(tenantFeaturesGet(rowData.id) as any);
    }
  };
  

  const [activeNavTabId, setActiveNavTabId] = useState(0);
  const [showTenantSettings, setShowTenantSettings] = useState(false);
  const [activeNavTabIdEdit, setActiveNavTabIdEdit] = useState(0);
  
  
    useEffect(() => {
      dispatch(fetchTenant() as any);
      dispatch(fetchEdition() as any);
    }, [dispatch]);

    useEffect(()=>{
      if(data.tenants.length){
        const tempData = data.tenants.map((tenant: any) => {
          return {
            id: tenant.id,
            tenant: {
              avatar:
                "https://media-exp1.licdn.com/dms/image/C4E0BAQE_SFGM1PgQQA/company-logo_200_200/0/1519889670567?e=2147483647&v=beta&t=a7t0VCUvkgkiicBZVFWj7be8pApofE4mjjuHSmaZgbg",
              title: tenant.name,
              info: "software",
            },
            editionName: tenant.editionName,
            status: tenant.activationState == 1 ? "Active" : "Inactive",
            expiry: tenant.editionEndDateUtc,
          };
        });
        setTableData(tempData);
      }
    },[data.tenants])

    useEffect(()=>{
      debugger
      if(data.feature){
        let tempFeatureData :any[] = [];
        data.feature.groups.map((item:any)=>{
          item.features.map((items:any)=>{
            let data = {}
            if(items.value == "True" || items.value == "true"){
              data = { value:true }
            }
            else if(items.value == "True" || items.value == "true"){
              data = { value:false}
            }
            else{
              data = { value:items.value }
            }
            tempFeatureData.push({...data, name:items.name});
          })
        })
        setFeatureIdentitySettingsData(tempFeatureData)
      }
  
    },[data.feature])


    useEffect(() => {
      if(data.edition)
      if (data.edition.items.length) {
        let editionData1:any[] = [];
        data.edition.items.map((item: any) => {
          const newItem = {
            option: item.displayName,
            value: item.id,
          };
          editionData1.push(newItem);
        });
        setEditionList(editionData1);
      }
    }, [data.edition]);

    useEffect(()=>{
      debugger
      if(data.editTenant){
        setTenantInformationData(data.editTenant);
      }
    },[data.editTenant]);


    function saveTenant(data:any){
      data.preventDefault();
      dispatch(createTenant(data) as any).then((res:any)=>{
        dispatch(fetchEdition() as any);
        dispatch(fetchTenant() as any);
      });
      setBasicTenantInformation(data)
    }
    const onDeleteHandler = () => {
      dispatch(deleteTenant(tenantId) as any).then((res:any)=>{
        dispatch(fetchTenant() as any);
      });
      
    };
  
    function saveFeature(data: any) {
      console.log("This is data ", data);
      const tempData: any[] = [];
      data.map((e: any) => {
        const item = {
          value: String(e.value),
          name: e.name,
        };
        tempData.push(item);
      });
      const data1 = {
        id: tableDataRowid,
        body:{features: tempData},
      };
      console.log("This is temp Data ", tempData);
      dispatch(saveFeaturesEdition(data1) as any);
    }
    function restoreFeatures(data: any) {
      dispatch(restoreToDefaultFeaturesEdition(tableDataRowid) as any).then((res: any) => {
      });
    }
  return (
    <div className="tenant">
      <div className="d-flex justify-content-end ">
        <RdsOffcanvas
          canvasTitle={"New Tenant"}
          placement="end"
          offcanvaswidth={650}
          offcanvasbutton={
            <div className="d-flex justify-content-end">
              <RdsButton
                icon="plus"
                label={"New Tenant"}
                iconColorVariant="light"
                iconHeight="15px"
                iconWidth="15px"
                iconFill={false}
                iconStroke={true}
                block={false}
                size="small"
                type="button"
                colorVariant="primary"
              ></RdsButton>
            </div>
          }
          backDrop={false}
          scrolling={false}
          preventEscapeKey={false}
          offId={"tenant"}
        >
          
            <RdsCompTenantInformation editions={editionList}  onSaveHandler={(e:any)=>saveTenant(e)} tenantInformationData1={basicTenantInformation} />
      
        </RdsOffcanvas>
      </div>
      <div className="card p-2 h-100 border-0 rounded-0 card-full-stretch mt-3 ">
        <RdsCompTenantList
          tableHeaders={tableHeaders}
          tableData={tableData}
          actions={actions}
          onActionSelection={onActionHandler}
          pagination={true}
          recordsPerPage={10}
          recordsPerPageSelectListOption={true}
        />

        <RdsOffcanvas
          canvasTitle={"Edit Tenant"}
          placement="end"
          offcanvaswidth={650}
          backDrop={false}
          scrolling={false}
          preventEscapeKey={false}
          offId={"Edit"}
        >
          <RdsNavtabs
            navtabsItems={navtabsItems}
            type="tabs"
            isNextPressed={showTenantSettings}
            activeNavTabId={activeNavTabIdEdit}
            activeNavtabOrder={(activeNavTabIdEdit) => {
              setActiveNavTabIdEdit(activeNavTabIdEdit),
                setShowTenantSettings(false);
            }}
          />
          {activeNavTabIdEdit == 0 && showTenantSettings === false && (
            <>
              <RdsCompTenantInformation editions={editionList} tenantInformationData1={tenantInformationData}  onSaveHandler={(e:any)=>{saveTenant(e)}} />
            </>
          )}
          {(activeNavTabIdEdit == 1 || showTenantSettings === true) && (
            <>
             <RdsCompFeatures
           featureIdentitySettingsData1={featureIdentitySettingsData}
           twoFactorList={[
             { option: "Optional", value: "Optional" },
             { option: "Disabled", value: "Disabled" },
             { option: "Forced", value: "Forced" },
           ]}
           saveFeature={saveFeature}
           restoreFeatures={restoreFeatures}
         />
            </>
          
          )}
        </RdsOffcanvas>
      </div>
      <RdsCompAlertPopup alertID="Del" onSuccess={onDeleteHandler} />
    </div>
  );
};

export default Tenant;
