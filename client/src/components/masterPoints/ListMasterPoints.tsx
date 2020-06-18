import React, {Component, useState, Fragment} from 'react';
import {getAllMasterPoints} from '../../dataservice/getPoints';
import {AdvancedPointsSearch} from './AdvancedPointsSearch';
import {Helmet} from 'react-helmet';
import {
  List,
  Card,
  Divider,
  Descriptions,
  Collapse,
  Button,
  Checkbox,
} from 'antd';
import {EyeOutlined} from '@ant-design/icons';
// import {AdvancedUserSearch} from './AdvancedUserSerach';
import {userContext, UserContextInterface} from '../../context/userContext';
import {Feature} from '../../interfaces/geoJsonInterface';

const {Panel} = Collapse;

interface State {
  pointsList: Feature[];
  listData: Feature[];
  renderedFeatures: {
    length: boolean;
    pdep: boolean;
    depth: boolean;
    elev: boolean;
    ps: boolean;
    co_name: boolean;
    ownership: boolean;
    topo_name: boolean;
    topo_indi: boolean;
    gear: boolean;
    ent_type: boolean;
    field_indi: boolean;
    map_status: boolean;
    geology: boolean;
    geo_age: boolean;
    phys_prov: boolean;
  };
  loading: boolean;
}

interface Props {}

class listPoints extends Component<Props, State> {
  constructor(Props) {
    super(Props);
    this.state = {
      pointsList: [],
      listData: [],
      loading: true,
      renderedFeatures: {
        length: true,
        pdep: true,
        depth: true,
        elev: false,
        ps: false,
        co_name: true,
        ownership: true,
        topo_name: false,
        topo_indi: false,
        gear: true,
        ent_type: false,
        field_indi: false,
        map_status: true,
        geology: false,
        geo_age: false,
        phys_prov: false,
      },
    };
    this.renderDescription = this.renderDescription.bind(this);
  }
  componentDidMount() {
    getAllMasterPoints().then(requestedPoints => {
      requestedPoints = requestedPoints.sort(
        (a, b) => b.properties.length - a.properties.length
      );
      this.setState({
        pointsList: requestedPoints,
        listData: requestedPoints,
        loading: false,
      });
    });
  }

  renderDescription(point: Feature) {
    const renderedItems = [];
    for (const key in this.state.renderedFeatures) {
      if (key === 'length' && this.state.renderedFeatures[key]) {
        renderedItems.push(
          <Descriptions.Item label="Length">
            {point.properties.length}
          </Descriptions.Item>
        );
      }
      if (key === 'pdep' && this.state.renderedFeatures[key]) {
        renderedItems.push(
          <Descriptions.Item label="Pit Depth">
            {point.properties.pdep}
          </Descriptions.Item>
        );
      }
      if (key === 'depth' && this.state.renderedFeatures[key]) {
        renderedItems.push(
          <Descriptions.Item label="Vertical Extent">
            {point.properties.depth}
          </Descriptions.Item>
        );
      }
      if (key === 'elev' && this.state.renderedFeatures[key]) {
        renderedItems.push(
          <Descriptions.Item label="Elevation">
            {point.properties.elev}
          </Descriptions.Item>
        );
      }
      if (key === 'ps' && this.state.renderedFeatures[key]) {
        renderedItems.push(
          <Descriptions.Item label="Number of Pits">
            {point.properties.ps}
          </Descriptions.Item>
        );
      }
      if (key === 'co_name' && this.state.renderedFeatures[key]) {
        renderedItems.push(
          <Descriptions.Item label="County">
            {point.properties.co_name}
          </Descriptions.Item>
        );
      }
      if (key === 'ownership' && this.state.renderedFeatures[key]) {
        renderedItems.push(
          <Descriptions.Item label="Ownership">
            {point.properties.ownership}
          </Descriptions.Item>
        );
      }
      if (key === 'topo_name' && this.state.renderedFeatures[key]) {
        renderedItems.push(
          <Descriptions.Item label="Topo">
            {point.properties.topo_name}
          </Descriptions.Item>
        );
      }
      if (key === 'topo_indi' && this.state.renderedFeatures[key]) {
        renderedItems.push(
          <Descriptions.Item label="Topo Indication">
            {point.properties.topo_indi}
          </Descriptions.Item>
        );
      }
      if (key === 'gear' && this.state.renderedFeatures[key]) {
        renderedItems.push(
          <Descriptions.Item label="Gear">
            {point.properties.gear}
          </Descriptions.Item>
        );
      }
      if (key === 'ent_type' && this.state.renderedFeatures[key]) {
        renderedItems.push(
          <Descriptions.Item label="Enterance Type">
            {point.properties.ent_type}
          </Descriptions.Item>
        );
      }
      if (key === 'field_indi' && this.state.renderedFeatures[key]) {
        renderedItems.push(
          <Descriptions.Item label="Field Indication">
            {point.properties.field_indi}
          </Descriptions.Item>
        );
      }
      if (key === 'map_status' && this.state.renderedFeatures[key]) {
        renderedItems.push(
          <Descriptions.Item label="Map Status">
            {point.properties.map_status}
          </Descriptions.Item>
        );
      }
      if (key === 'geology' && this.state.renderedFeatures[key]) {
        renderedItems.push(
          <Descriptions.Item label="Geology">
            {point.properties.geology}
          </Descriptions.Item>
        );
      }
      if (key === 'geo_age' && this.state.renderedFeatures[key]) {
        renderedItems.push(
          <Descriptions.Item label="Geology Age">
            {point.properties.geo_age}
          </Descriptions.Item>
        );
      }
      if (key === 'phys_prov' && this.state.renderedFeatures[key]) {
        renderedItems.push(
          <Descriptions.Item label="Physiographic Province">
            {point.properties.phys_prov}
          </Descriptions.Item>
        );
      }
    }
    return (
      <Descriptions
        size="small"
        column={{xxl: 2, xl: 1, lg: 1, md: 2, sm: 3, xs: 2}}
      >
        {renderedItems}
      </Descriptions>
    );
  }

  defaultRenderedItems() {
    const defaultItems = [] as string[];
    for (const key in this.state.renderedFeatures) {
      if (this.state.renderedFeatures[key]) {
        defaultItems.push(key);
      }
    }
    return defaultItems;
  }

  render() {
    const currentUser = this.context as UserContextInterface;
    return (
      <div>
        <Helmet>
          <title>Points</title>
        </Helmet>
        <Card>
          <AdvancedPointsSearch
            pointList={this.state.pointsList}
            onSearchFinished={results => {
              this.setState({listData: results});
            }}
            isLoading={loading => {
              this.setState({loading});
            }}
          ></AdvancedPointsSearch>
          <Divider></Divider>
          <Collapse>
            <Panel header="Properties to Display" key={1}>
              <Checkbox.Group
                options={[
                  {label: 'Length', value: 'length'},
                  {label: 'Pit Depth', value: 'pdep'},
                  {label: 'Vertical Extent', value: 'depth'},
                  {label: 'Elevation', value: 'elev'},
                  {label: 'Number of Pits', value: 'ps'},
                  {label: 'County', value: 'co_name'},
                  {label: 'Ownership', value: 'ownership'},
                  {label: 'Topo', value: 'topo_name'},
                  {label: 'Topo Indication', value: 'topo_indi'},
                  {label: 'Gear', value: 'gear'},
                  {label: 'Enterance Type', value: 'ent_type'},
                  {label: 'Field Indication', value: 'field_indi'},
                  {label: 'Map Status', value: 'map_status'},
                  {label: 'Geology', value: 'geology'},
                  {label: 'Geology Age', value: 'geo_age'},
                  {label: 'Physiographic Province', value: 'phys_prov'},
                ]}
                onChange={checkedValue => {
                  const {renderedFeatures} = {...this.state};
                  for (const key in renderedFeatures) {
                    if (
                      checkedValue.filter(value => value === key).length !== 0
                    ) {
                      renderedFeatures[key] = true;
                    } else {
                      renderedFeatures[key] = false;
                    }
                  }
                  this.setState({renderedFeatures});
                }}
                defaultValue={this.defaultRenderedItems()}
              />
            </Panel>
          </Collapse>
          <Divider></Divider>
          <List
            pagination={{
              onChange: page => {},
              pageSize: 8,
              position: 'bottom',
            }}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3,
              xl: 4,
              xxl: 5,
            }}
            dataSource={this.state.listData}
            loading={this.state.loading}
            renderItem={point => (
              <List.Item>
                <Card
                  title={
                    point.properties.name + ' ' + point.properties.tcsnumber
                  }
                  key={point.properties.tcsnumber}
                  actions={[
                    <Button
                      type="primary"
                      icon={<EyeOutlined />}
                      onClick={() => {
                        this.props.history.push(
                          '/points/' + point.properties.tcsnumber
                        );
                      }}
                    >
                      More Info
                    </Button>,
                  ]}
                >
                  {this.renderDescription(point)}
                </Card>
              </List.Item>
            )}
          />
        </Card>
      </div>
    );
  }
}

listPoints.contextType = userContext;

export {listPoints};