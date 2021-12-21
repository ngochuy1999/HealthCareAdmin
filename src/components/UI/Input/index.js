import React from 'react';
import { Form } from 'react-bootstrap';

const Input = (props) => {

  let input = null;
  switch(props.type){
    case 'select':
      input = <Form.Group style={{marginBottom:15}}>
                {props.label && <Form.Label>{props.label}</Form.Label>}
                <select
                  className="form-control form-control-sm"
                  value={props.value}
                  name={props.name}
                  onChange={props.onChange}
                >
                  <option value="">{props.placeholder}</option>
                  {
                    props.options.length > 0 ?
                    props.options.map((option, index) =>
                      <option key={index} value={option.value}>{option.name}</option>
                    ) : null
                  }
                </select>
            </Form.Group>
      break;
    case 'text':
    default:
      input = <Form.Group style={{marginBottom:15}}>
                {props.label && <Form.Label>{props.label}</Form.Label>}
                <Form.Control 
                    as={props.as} rows={props.rows}
                    type={props.type} 
                    placeholder={props.placeholder} 
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    required
                    {...props}
                />
                <Form.Text className="text-muted">
                  {props.errorMessage}
                </Form.Text>
            </Form.Group>
  }


  return input;

 }

export default Input