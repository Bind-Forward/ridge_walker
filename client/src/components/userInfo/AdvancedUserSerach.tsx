import React, {Component, useState, Fragment} from 'react';
import {UserInterface} from '../../interfaces/UserInterface';
import {getAllUsers} from '../../dataservice/authentication';
import {
    List,
    Card,
    Row,
    Col,
    Typography,
    Space,
    Tag,
    Tooltip,
    Button,
    Popconfirm,
    Input,
    Select,
  } from 'antd';
const Search = Input; 
const Option = Select; 

interface State {
    userList: UserInterface[];
    searchData: UserInterface[];
    loading: boolean;
    searchParams: {
        name: string,
        status: ("Approved" | "Pending" | "Rejected" | any)[],
    };
}
interface Props {
    userList: UserInterface[];
    onSearch: (results: UserInterface[]) => void
}

class AdvancedUserSearch extends Component<Props, State> {
    constructor(Props) {
      super(Props);
      this.state = {
        userList: this.props.userList,
        searchData: [],
        loading: true,
        searchParams: {
            name: "",
            status: ["Approved", "Pending"]
        }
      };
      this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(){
        // name search
        let results = [...this.props.userList]
        results = results.filter((user)=>{
            const name = (user.firstName + " " + user.lastName).toLowerCase();
            const searchText = this.state.searchParams.name.toLowerCase();
            return (name.includes(searchText));
        })

        // checks for multiple statues
        results = results.filter((user)=>{
            return (
                // checks if user has any of the selected statues
                this.state.searchParams.status
                .map((status)=>{
                    return (user.status === status)
                })
                .reduce((a, b)=>(a || b), false) // combines true vals in array
                )
        })
        this.props.onSearch(results);
    }

    render() {
      return (
          <Fragment>
              <Col span={12}>
                  <Search
                      placeholder="Search by name"
                      onChange={(e)=>{
                          const searchParams = {...this.state.searchParams};
                          searchParams.name = e.target.value;
                          this.setState({searchParams}, ()=>{
                              this.handleSearch();
                          })
                      }}
                  >
                  </Search>
              </Col>
              <Col span={12}>
                  <Select
                      mode="multiple"
                      placeholder="Select Status"
                      defaultValue={this.state.searchParams.status}
                      onChange={(statuses: string[])=>{
                          const searchParams = {...this.state.searchParams};
                          searchParams.status = statuses;
                          this.setState({searchParams},()=>{
                              this.handleSearch();
                          })
                      }}
                      tokenSeparators={[',']}>
                      <Option key="Approved" value="Approved">
                          Approved
                      </Option>
                      <Option key="Pending" value="Pending">
                          Pending
                      </Option>
                      <Option key="Rejected" value="Rejected">
                          Rejected
                      </Option>
                  </Select>
              </Col>
            </Fragment>
      );
    }
  }
  export {AdvancedUserSearch};