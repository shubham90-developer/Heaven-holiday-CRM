"use client";
import React, {useState} from 'react'
import { Button, Modal,Card, Tabs, Tab, Form, Row, Col, CardHeader, NavItem, CardBody } from "react-bootstrap";
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRouter } from 'next/navigation';

const EditVisa = () => {
      const router=useRouter()
        const [addservice, setAddService]=useState(1)
  
        const [docs, setDocs]= useState([

           { id: 1, name: "Original Passport", checked: false },
    { id: 2, name: "Photo (35mm x 45mm)", checked: false },
    { id: 3, name: "PAN Card", checked: false },
     { id: 4, name: "Document Radio Button", checked: false },

        ])
  
      const handleChange= (id:number) =>{
        setDocs(
          docs.map((item) =>
            item.id=== id ?
          {...item, checked:!item.checked}
          :item
        ))
      }
        return (
    <>
        <Card className='p-3'>
            <div className='text-end'>
            <Button
                                  variant="primary"
                                  size="sm"
                          onClick={() => router.push("/my-inventory/visa")}
                                  style={{ fontSize: "10px", fontWeight: "bold" }}
                                >
                      <Icon icon="mdi:eye" className='me-1'   />       My Visa
                                </Button>      
            </div>
            <hr/>
        <Form>
            <Row >
         <Col md={4}>
      <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
        Travelers Nationality
      </Form.Label>
      <Form.Select size="sm" style={{ fontSize: "10px" }}>
        <option>India</option>
        <option>USA</option>
        <option>UK</option>
      </Form.Select>
  </Col>

  {/* Countries Covered */}
  <Col md={4}>
      <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
        Countries Covered
      </Form.Label>
      <Form.Control size="sm" style={{ fontSize: "10px" }} placeholder="Enter Countries" />
  </Col>
            </Row>

<div className='my-3 border p-3'>
    <Row className="g-2">

  {/* Visa Name */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Visa Name *
    </Form.Label>
    <Form.Control size="sm" placeholder="Visa Name" style={{ fontSize: "10px" }} />
  </Col>

  {/* Visa Type */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Visa Type
    </Form.Label>
    <Form.Select size="sm" style={{ fontSize: "10px" }}>
      <option>Select</option>
      <option>e Visa</option>
      <option>Sticker Visa</option>
    </Form.Select>
  </Col>

  {/* Visa Category */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Visa Category
    </Form.Label>
    <Form.Select size="sm" style={{ fontSize: "10px" }}>
      <option>Tourism</option>
      <option>Business</option>
    </Form.Select>
  </Col>

  {/* Entry Type */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Entry Type
    </Form.Label>
    <Form.Select size="sm" style={{ fontSize: "10px" }}>
      <option>Single Entry</option>
      <option>Multiple Entry</option>
    </Form.Select>
  </Col>

  {/* Processing Time */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Processing Time
    </Form.Label>
    <Form.Control size="sm" style={{ fontSize: "10px" }} />
  </Col>

  {/* Passport Expire */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Passport Expire (Days)
    </Form.Label>
    <Form.Control size="sm" style={{ fontSize: "10px" }} />
  </Col>

  {/* Validity */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Validity of Visa (Days)
    </Form.Label>
    <Form.Control size="sm" style={{ fontSize: "10px" }} />
  </Col>

  {/* Duration */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Duration
    </Form.Label>
    <Form.Control size="sm" style={{ fontSize: "10px" }} />
  </Col>

  {/* Supplier */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Supplier
    </Form.Label>
    <Form.Control size="sm" placeholder="Supplier" style={{ fontSize: "10px" }} />
  </Col>

  {/* Currency */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Embassy Fee Currency
    </Form.Label>
    <Form.Select size="sm" style={{ fontSize: "10px" }}>
      <option>INR</option>
      <option>USD</option>
    </Form.Select>
  </Col>

  {/* Adult */}
  <Col md={2}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Adult
    </Form.Label>
    <Form.Control size="sm" defaultValue="0" style={{ fontSize: "10px" }} />
  </Col>

  {/* Child */}
  <Col md={2}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Child
    </Form.Label>
    <Form.Control size="sm" defaultValue="0" style={{ fontSize: "10px" }} />
  </Col>

  {/* Child Age */}
  <Col md={2}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Child Age
    </Form.Label>
    <Form.Control size="sm" defaultValue="0" style={{ fontSize: "10px" }} />
  </Col>

  {/* Infant */}
  <Col md={2}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Infant
    </Form.Label>
    <Form.Control size="sm" defaultValue="0" style={{ fontSize: "10px" }} />
  </Col>

</Row>
</div>


   <strong style={{ fontSize: "10px"}}>Add Markup</strong>

   <div className="table-responsive my-2">
  <table
    className="table table-sm table-bordered mb-0 align-middle"
    style={{ tableLayout: "fixed", width: "100%" }}
  >
    <thead>
      <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
        <th style={{ width: "150px" }}>Market Place</th>
        <th style={{ width: "120px" }}>Currency</th>
        <th style={{ width: "150px" }}>Mark Up Type</th>
        <th style={{ width: "120px" }}>Adult</th>
        <th style={{ width: "120px" }}>Child</th>
        <th style={{ width: "120px" }}>Infant</th>
      </tr>
    </thead>

    <tbody style={{ fontSize: "10px" }}>
      <tr>
        <td>MY B2C</td>

        <td>
          <Form.Select size="sm" style={{ fontSize: "10px"}}>
            <option>INR</option>
          </Form.Select>
        </td>

        <td>
          <Form.Select size="sm" style={{ fontSize: "10px"}}>
            <option>Amount</option>
            <option>Percentage</option>
          </Form.Select>
        </td>

        <td><Form.Control size="sm" defaultValue="0" style={{ fontSize: "10px"}} /></td>
        <td><Form.Control size="sm" defaultValue="0"  style={{ fontSize: "10px"}}/></td>
        <td><Form.Control size="sm" defaultValue="0"  style={{ fontSize: "10px"}}/></td>
      </tr>

      <tr>
        <td>MY B2B</td>

        <td>
          <Form.Select size="sm" style={{ fontSize: "10px"}}>
            <option>INR</option>
          </Form.Select>
        </td>

        <td>
          <Form.Select size="sm" style={{ fontSize: "10px"}}>
            <option>Amount</option>
            <option>Percentage</option>
          </Form.Select>
        </td>

        <td><Form.Control size="sm" defaultValue="0" style={{ fontSize: "10px"}}/></td>
        <td><Form.Control size="sm" defaultValue="0" style={{ fontSize: "10px"}} /></td>
        <td><Form.Control size="sm" defaultValue="0" style={{ fontSize: "10px"}} /></td>
      </tr>
    </tbody>
  </table>
</div>

<strong  style={{ fontSize: "10px"}}>Add Service Provider</strong>
       
       <div className="table-responsive my-2">
  <table
    className="table table-sm table-bordered mb-0 align-middle"
    style={{ tableLayout: "fixed", width: "100%" }}
  >
    <thead>
      <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
        <th style={{ width: "80px" }}>Display</th>
        <th style={{ width: "200px" }}>Service Name</th>
        <th style={{ width: "120px" }}>Currency</th>
        <th style={{ width: "150px" }}>Fees</th>
        <th style={{ width: "150px" }}>Markup</th>
        <th style={{ width: "80px" }}>Taxable</th>
        <th style={{ width: "80px" }}>Action</th>
      </tr>
    </thead>

    <tbody style={{ fontSize: "10px" }}>
        { [ ...Array(addservice)].map((_, index) => (
      <tr key={index}>
        <td>
          <Form.Check type="checkbox" />
        </td>

        <td>
          <Form.Control size="sm" placeholder="Enter Title" style={{ fontSize: "10px"}} />
        </td>

        <td>
          <Form.Select size="sm" style={{ fontSize: "10px"}}>
            <option>INR</option>
          </Form.Select>
        </td>

        <td>
          <Form.Control size="sm" placeholder="Enter value" style={{ fontSize: "10px"}} />
        </td>

        <td>
          <Form.Control size="sm" placeholder="Enter value" style={{ fontSize: "10px"}} />
        </td>

        <td className="text-center">
          <Form.Check type="checkbox" style={{ fontSize: "10px"}} />
        </td>

        <td className="text-center">
          <Button variant="outline-danger" 
           onClick={()=>setAddService(addservice - 1)}
          size="sm" style={{ fontSize: "10px"}}>-</Button>
        </td>
      </tr>
        ))}
    </tbody>
  </table>

  {/* Add More Button */}
  <div className="d-flex justify-content-end mt-2">
    <Button size="sm" 
    style={{ fontSize: "10px"}}
    onClick={()=>setAddService(addservice + 1)}
    variant="outline-danger">
      Add More
    </Button>
  </div>
</div>

<strong  style={{ fontSize: "10px"}}>Add/Update Visa Document Details</strong>
      
  <Tabs 
  defaultActiveKey="Basic Details"
  id="fill-tab-example"
  className="mb-3 py-2"
  variant="pills"
 style={{ fontSize: "10px" }}
 >

  <Tab eventKey="Basic Details" title="Basic Details">
   <Row className='g-2 mb-4'>
    <Col md={6}>
     <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
Docs Required
        </Form.Label>
        <Form.Control as="textarea" rows={3} size='sm' style={{ fontSize: "10px" }} />
    </Col>
   <Col md={6}>
     <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
Basic Requirements to visit
        </Form.Label>
        <Form.Control as="textarea" rows={3} size='sm' style={{ fontSize: "10px" }} />
    </Col>
    <Col md={6}>
     <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
Embassy Address
        </Form.Label>
        <Form.Control as="textarea" rows={3} size='sm' style={{ fontSize: "10px" }} />
    </Col>
</Row>

    
      <div className="table-responsive">
                  <table
                    className="table table-sm table-bordered mb-0 align-middle"
                    style={{ tableLayout: "fixed", width: "100%" }}
                  >
                    <tbody>
                      <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                      <td style={{width:"180px"}}>Document 1</td>
                      <td><Form.Control size='sm' style={{ fontSize: "10px" }} /></td>
                      <td><Form.Control type='file' size='sm' style={{ fontSize: "10px" }} /></td>
                      </tr>
                        <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                      <td>Document 2</td>
                      <td><Form.Control size='sm' style={{ fontSize: "10px" }} /></td>
                      <td><Form.Control type='file' size='sm' style={{ fontSize: "10px" }} /></td>
                      </tr>
                      <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                      <td>Document 3</td>
                      <td><Form.Control size='sm' style={{ fontSize: "10px" }} /></td>
                      <td><Form.Control type='file' size='sm' style={{ fontSize: "10px" }} /></td>
                      </tr>
                      <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                      <td>Document 4</td>
                      <td><Form.Control size='sm' style={{ fontSize: "10px" }} /></td>
                      <td><Form.Control type='file' size='sm' style={{ fontSize: "10px" }} /></td>
                      </tr>
                        <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                      <td>Document 5</td>
                      <td><Form.Control size='sm' style={{ fontSize: "10px" }} /></td>
                      <td><Form.Control type='file' size='sm' style={{ fontSize: "10px" }} /></td>
                      </tr>
                      <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                      <td>Document 6</td>
                      <td><Form.Control size='sm' style={{ fontSize: "10px" }} /></td>
                      <td><Form.Control type='file' size='sm' style={{ fontSize: "10px" }} /></td>
                      </tr>
                      </tbody>
                      </table>
                      </div>
   
   
    </Tab>

    <Tab eventKey="fields / doc mapping" title="Fields / Doc Mapping">
    <div>
      <Row className='align-items-center mb-2'>
        <Col md={3}>
        <div className='d-flex gap-2 align-items-center'>
         <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
Physical Submission
        </Form.Label>
        <Form.Check type='radio' name='submissiontype' id='submissionyes' label='Yes'  style={{ fontSize: "10px" }} />
        <Form.Check type='radio' label='No' name='submissiontype' id='submissionno' style={{ fontSize: "10px" }} />
        </div>
        </Col>

                <Col md={4}>
        <div className='d-flex gap-2 align-items-center'>
         <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
Physical Interview
        </Form.Label>
        <Form.Check type='radio' name='type' id='yes' label='Yes'  style={{ fontSize: "10px" }} />
        <Form.Check type='radio' label='No' name='type' id='no' style={{ fontSize: "10px" }} />
        </div>
        </Col>
      </Row>

  <div className=''>
        { docs.map((item)=>(
          <div key={item.id}
          className='border mb-2 p-1 d-flex justify-content-between'
          >
            <div className='d-flex gap-2' >
              <Form.Check
              type='checkbox'
              label={item.name}
              style={{ fontSize: "10px" }}
              checked={item.checked}
              onChange={()=>handleChange(item.id)}
              />

              {item.checked && (
                <>
                <div className='d-flex gap-1'>
                <Icon icon="mdi:alert-circle" className='me-1'/>
                    <Form.Check type='checkbox' label='Mandatory' style={{ fontSize: "10px" }} name='required' id='mandatory' />
           </div>
                </>
              
              )}
              </div>
              <span><Icon icon="mdi:plus"/></span>
            </div>
        ))}

  </div>
    </div>
    </Tab>
  </Tabs>
<div className='text-end mt-3'>
    <Button size="sm" 
    style={{ fontSize: "10px",fontWeight:"bold"}}
    variant="success">
   Save
    </Button>
</div>
        </Form>
        </Card>
    </>
   
  )
}

export default EditVisa
