import React, { useState } from 'react'
import { Button, Form, Row, Col, Card, Table } from "react-bootstrap";

const tabs: string[] = [
    "Package",
    "Flight",
    "Hotel",
    "Visa",
    "Transport"
];
import { Icon } from '@iconify/react/dist/iconify.js';
import { set } from 'react-hook-form';
import AddTaxModal from './AddTaxModal';
import EditTaxModal from './EditTaxModal';
const TaxSettings: React.FC = () => {
    const [activeTab, setActiveTab]=useState<number>(0);
 const [taxadd, setTaxAdd] = useState(false)
    return (
    <>
      <div className='p-2'>
        <div className='d-flex gap-2 flex-wrap mb-3'>
        {tabs.map((tab, index)=>(
            <Button
                key={index}
                size='sm'
                variant={activeTab === index ? "primary" : "outline-primary"}
                onClick={()=>setActiveTab(index)}
                >{tab}</Button>
        ))}

        </div>


        <div className=''>

 <div className='text-end mb-2'>
              <Button size="sm" variant="outline-danger" 
              className="me-2 px-3"
              onClick={()=>setTaxAdd(true)}
              >
                          Add
                          </Button>
         </div>
{ taxadd && ( <AddTaxModal onClose={()=>setTaxAdd(false)} />)}
       
            {activeTab === 0 && <Package/> }

            {activeTab === 1 && <Flight/> }

            {activeTab === 2 && <Hotel/> }

        </div>
      </div>
    </>
  )
}

export default TaxSettings;


const Package = () => {
 const [edittax, setedittax]=useState(false)
    return(
        <>
             <div className="table-responsive">
  <table
    className="table table-sm table-bordered mb-0 align-middle"
    style={{ tableLayout: "fixed", width: "100%" }}
  >
    <thead>
      <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
      

        <th style={{ width: "150px" }}>Tax Name</th>
        <th style={{ width: "120px" }}>Tax Percentage</th>
        <th style={{ width: "200px" }}>Tax Type</th>
        <th style={{ width: "120px" }}>Plan Type</th>
        <th style={{ width: "80px" }}>Display</th>
        <th style={{ width: "80px" }}>Default</th>
        <th style={{ width: "150px" }}>Is B2C Site Default</th>
        <th style={{ width: "120px" }}>Cess Applicable</th>
        <th style={{ width: "80px" }}>Status</th>
        <th style={{ width: "80px" }}>Order</th>
        <th style={{ width: "100px" }}>Action</th>
      </tr>
    </thead>

    <tbody style={{ fontSize: "11px" }}>
      <tr>
      
        <td>On Total</td>
        <td>5</td>
        <td>On Total</td>
        <td>Package</td>
        <td><Form.Check type="checkbox" defaultChecked /></td>
        <td><Form.Check type="radio" name="default" defaultChecked /></td>
        <td><Form.Check type="radio" name="b2c" /></td>
        <td>No</td>
        <td>Active</td>
        <td>
          <Form.Select size="sm" style={{ fontSize: "10px" }}>
            <option>1</option>
          </Form.Select>
        </td>
        <td>
          <div className="d-flex gap-2">
           <span className="action-btn delete">
                                    <Button
                                      variant="info"
                                      size="sm"
                                      onClick={()=>setedittax(true)}
                                      style={{ fontSize: "8px" }}
                                      title="Edit"
                                    >
                                      <Icon icon="mdi:pencil" />
                                    </Button>
        { edittax && ( <EditTaxModal onClose={()=>setedittax(false)} />)}
                                  </span>
                                  <span className="action-btn delete">
                                    <Button
                                      variant="danger"
                                      size="sm"
                                      style={{ fontSize: "8px" }}
                                      title="Delete"
                                    >
                                      <Icon icon="mdi:trash-can-outline" />
                                    </Button>
                                  </span>
             </div>
        </td>
      </tr>

      <tr>

        <td>On Markup</td>
        <td>18</td>
        <td>On Service Fee / Markup</td>
        <td>Package</td>
        <td><Form.Check type="checkbox" defaultChecked /></td>
        <td><Form.Check type="radio" name="default" /></td>
        <td><Form.Check type="radio" name="b2c" defaultChecked /></td>
        <td>No</td>
        <td>Active</td>
        <td>
          <Form.Select size="sm" style={{ fontSize: "10px" }}>
            <option>2</option>
          </Form.Select>
        </td>
        <td>
          <div className="d-flex gap-2">
           <span className="action-btn delete">
                                    <Button
                                      variant="info"
                                      size="sm"
                                      style={{ fontSize: "8px" }}
                                      title="Edit"
                                    >
                                      <Icon icon="mdi:pencil" />
                                    </Button>
                                  </span>
                                  <span className="action-btn delete">
                                    <Button
                                      variant="danger"
                                      size="sm"
                                      style={{ fontSize: "8px" }}
                                      title="Delete"
                                    >
                                      <Icon icon="mdi:trash-can-outline" />
                                    </Button>
                                  </span>
             </div>
        </td>
      </tr>

      <tr>
      
        <td>No Tax</td>
        <td>0</td>
        <td>No Tax</td>
        <td>Package</td>
        <td><Form.Check type="checkbox" defaultChecked /></td>
        <td><Form.Check type="radio" name="default" /></td>
        <td><Form.Check type="radio" name="b2c" /></td>
        <td>No</td>
        <td>Active</td>
        <td>
          <Form.Select size="sm" style={{ fontSize: "10px" }}>
            <option>3</option>
          </Form.Select>
        </td>
        <td>
          <div className="d-flex gap-2">
           <span className="action-btn delete">
                                    <Button
                                      variant="info"
                                      size="sm"
                                      style={{ fontSize: "8px" }}
                                      title="Edit"
                                    >
                                      <Icon icon="mdi:pencil" />
                                    </Button>
                                  </span>
                                  <span className="action-btn delete">
                                    <Button
                                      variant="danger"
                                      size="sm"
                                      style={{ fontSize: "8px" }}
                                      title="Delete"
                                    >
                                      <Icon icon="mdi:trash-can-outline" />
                                    </Button>
                                  </span>
             </div>
        </td>
      </tr>

      <tr>
     
        <td>Tax Extra w/o text</td>
        <td>0</td>
        <td>No Tax</td>
        <td>Package</td>
        <td><Form.Check type="checkbox" defaultChecked /></td>
        <td><Form.Check type="radio" name="default" /></td>
        <td><Form.Check type="radio" name="b2c" /></td>
        <td>No</td>
        <td>Active</td>
        <td>
          <Form.Select size="sm" style={{ fontSize: "10px" }}>
            <option>4</option>
          </Form.Select>
        </td>
      <td>
          <div className="d-flex gap-2">
           <span className="action-btn delete">
                                    <Button
                                      variant="info"
                                      size="sm"
                                      style={{ fontSize: "8px" }}
                                      title="Edit"
                                    >
                                      <Icon icon="mdi:pencil" />
                                    </Button>
                                  </span>
                                  <span className="action-btn delete">
                                    <Button
                                      variant="danger"
                                      size="sm"
                                      style={{ fontSize: "8px" }}
                                      title="Delete"
                                    >
                                      <Icon icon="mdi:trash-can-outline" />
                                    </Button>
                                  </span>
             </div>
        </td>
      </tr>

      <tr>
     
        <td>Tax Extra with text</td>
        <td>0</td>
        <td>No Tax</td>
        <td>Package</td>
        <td><Form.Check type="checkbox" defaultChecked /></td>
        <td><Form.Check type="radio" name="default" /></td>
        <td><Form.Check type="radio" name="b2c" /></td>
        <td>No</td>
        <td>Active</td>
        <td>
          <Form.Select size="sm" style={{ fontSize: "10px" }}>
            <option>5</option>
          </Form.Select>
        </td>
      <td>
          <div className="d-flex gap-2">
           <span className="action-btn delete">
                                    <Button
                                      variant="info"
                                      size="sm"
                                      style={{ fontSize: "8px" }}
                                      title="Edit"
                                    >
                                      <Icon icon="mdi:pencil" />
                                    </Button>
                                  </span>
                                  <span className="action-btn delete">
                                    <Button
                                      variant="danger"
                                      size="sm"
                                      style={{ fontSize: "8px" }}
                                      title="Delete"
                                    >
                                      <Icon icon="mdi:trash-can-outline" />
                                    </Button>
                                  </span>
             </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>


             <Card className="mt-4">
        <Card.Header style={{ fontSize: "12px",}} className='p-1'>
          TCS Settings
        </Card.Header>

        <Card.Body className='p-1'>
          <Form.Check type="checkbox" label="TCS" style={{ fontSize: "12px",}} />
        </Card.Body>
      </Card>
        </>
    )
}


const Flight = () =>{
 const [edittax, setedittax]=useState(false)
    return(
        <>
            <div className="table-responsive">
  <table
    className="table table-sm table-bordered mb-0 align-middle"
    style={{ tableLayout: "fixed", width: "100%" }}
  >
    <thead>
      <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
      
        <th style={{ width: "150px" }}>Tax Name</th>
        <th style={{ width: "120px" }}>Tax Percentage</th>
        <th style={{ width: "200px" }}>Tax Type</th>
        <th style={{ width: "120px" }}>Plan Type</th>
        <th style={{ width: "80px" }}>Display</th>
        <th style={{ width: "80px" }}>Default</th>
        <th style={{ width: "150px" }}>Is B2C Site Default</th>
        <th style={{ width: "120px" }}>Cess Applicable</th>
        <th style={{ width: "80px" }}>Status</th>
        <th style={{ width: "80px" }}>Order</th>
        <th style={{ width: "100px" }}>Action</th>
      </tr>
    </thead>

    <tbody style={{ fontSize: "11px" }}>
      <tr>
       
        <td>On Total</td>
        <td>5</td>
        <td>On Total</td>
        <td>Package</td>
        <td><Form.Check type="checkbox" defaultChecked /></td>
        <td><Form.Check type="radio" name="default" defaultChecked /></td>
        <td><Form.Check type="radio" name="b2c" /></td>
        <td>No</td>
        <td >Active</td>
        <td>
          <Form.Select size="sm" style={{ fontSize: "10px" }}>
            <option>1</option>
          </Form.Select>
        </td>
        <td>
          <div className="d-flex gap-2">
           <span className="action-btn delete">
                                    <Button
                                      variant="info"
                                      size="sm"
                                      onClick={()=>setedittax(true)}
                                      style={{ fontSize: "8px" }}
                                      title="Edit"
                                    >
                                      <Icon icon="mdi:pencil" />
                                    </Button>
                                  </span>
            { edittax && ( <EditTaxModal onClose={()=>setedittax(false)} />)}
                                  <span className="action-btn delete">
                                    <Button
                                      variant="danger"
                                      size="sm"
                                      style={{ fontSize: "8px" }}
                                      title="Delete"
                                    >
                                      <Icon icon="mdi:trash-can-outline" />
                                    </Button>
                                  </span>
             </div>
        </td>
      </tr>
      </tbody>
      </table>
      </div>

       <Card className="mt-4 ">
        <Card.Header style={{ fontSize: "12px",}} className='p-1'>
          TCS Settings
        </Card.Header>

        <Card.Body className='p-1'>
          <Form.Check type="checkbox" label="TCS" />
        </Card.Body>
      </Card>
        </>
    )
}

const Hotel = () => {
    return (
        <>
                 <div className="table-responsive">
  <table
    className="table table-sm table-bordered mb-0 align-middle"
    style={{ tableLayout: "fixed", width: "100%" }}
  >
    <thead>
      <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
       

        <th style={{ width: "150px" }}>Tax Name</th>
        <th style={{ width: "120px" }}>Tax Percentage</th>
        <th style={{ width: "200px" }}>Tax Type</th>
        <th style={{ width: "120px" }}>Plan Type</th>
        <th style={{ width: "80px" }}>Display</th>
        <th style={{ width: "80px" }}>Default</th>
        <th style={{ width: "150px" }}>Is B2C Site Default</th>
        <th style={{ width: "120px" }}>Cess Applicable</th>
        <th style={{ width: "80px" }}>Status</th>
        <th style={{ width: "80px" }}>Order</th>
        <th style={{ width: "100px" }}>Action</th>
      </tr>
    </thead>

    <tbody style={{ fontSize: "11px" }}>
      <tr>
      <td colSpan={11}>

        </td>
      </tr>
      </tbody>
      </table>
      </div>

       <Card className="mt-4">
        <Card.Header style={{ fontSize: "12px",}} className='p-1'>
          TCS Settings
        </Card.Header>

        <Card.Body className='p-1'>
          <Form.Check type="checkbox" label="TCS" />
        </Card.Body>
      </Card>
        </>
    )
}
