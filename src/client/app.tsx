import React, {PureComponent, MouseEvent} from 'react';
import {Layout, Typography, Button, Row, Col} from 'antd';

import {EmptyObject} from '../types/common';

import {TodoListScene} from './scenes/todo-list';

import './index.css';

export class App extends PureComponent<EmptyObject, EmptyObject> {
    ref = React.createRef();

    handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        console.log('scene ref', this.ref.current);
    };

    render() {
        return (
            <Layout>
                <Layout.Header>
                    <Typography.Title level={2}>
                        <Typography.Text type="success">
                            Yet Another Todo List
                        </Typography.Text>
                    </Typography.Title>
                </Layout.Header>
                <Layout.Content>
                    <Row justify="center" align="top">
                        <Col span={14}>
                            <TodoListScene ref={this.ref} someOwnProp="cmon, it\'s me" />
                        </Col>
                    </Row>
                </Layout.Content>
                <Layout.Footer>
                    <a href="#" onClick={this.handleClick}>
                        <Button>get scene ref</Button>
                    </a>
                </Layout.Footer>
            </Layout>
        );
    }
}
