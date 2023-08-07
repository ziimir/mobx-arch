import "reflect-metadata";
import React, {PureComponent, MouseEvent, useMemo, useState, useEffect} from 'react';
import {Layout, Typography, Button, Row, Col} from 'antd';
import {Provider, useContainer} from 'inversify-react';
import {interfaces} from 'inversify';
import {observer} from 'mobx-react';

import {TstView} from './scenes/tst/tst-view';

import {EmptyObject} from '../types/common';

import {TodoList, TodoListFactory} from "../ddd/models/todo-list/todo-list";

import {container} from './di.config';
import {Reset} from './reset';

//import {TodoListScene} from './scenes/todo-list';

import './index.css';

let render = false;

const TST = observer(({text}) => {
    const c = useContainer();
    const todoListFactory = c.get('Factory<TodoList>');

    const todoList = useMemo(() => todoListFactory([{id: 99, text}]), [text]);
    //const todoList = todoListFactory([{id: 99, text}]);

    console.log('=============================+>', todoList);

    const todoList2 = c.get('TodoList');
    console.log('=============================+>', todoList2);

    console.log('=============================+>', todoList === todoList2);

    //useEffect(() => {
        //setTimeout(() => {
            //todoListFactory([{id: 0, text: 'asdfasdfasdf'}]);
        //}, 3000)
    //}, []);

    return <>
        <button
            onClick={() => {
                todoList2.add({id: 1, text: 'oneoneone'});
            }}
        >
            aaaa
        </button>
        <div>{
            todoList2.list.map(({id, text}) => (
                <div>{`${id}: ${text}`}</div>
            ))
        }</div>
    </>;
});

export class App extends PureComponent<EmptyObject, EmptyObject> {
    ref = React.createRef();

    state = {
        text: 'sdfsdf'
        tstPrp: 'own'
    };

    handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        console.log('scene ref', this.ref.current);
    };

    handleTstClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        this.setState({tstPrp: 'outer'});
    };

    handleChangeText = (e) => {
        this.setState({text: e.target.value});
    };

    render() {
        return (
            <Provider container={container}>
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
                            AAAAAA
                            <input type="text" value={this.state.text} onChange={this.handleChangeText} />
                            <TST text={this.state.text} />
                            <Reset />
                            <TstView ownProp={this.state.tstPrp} />
                            <button onClick={this.handleTstClick}>BBBB</button>
                        </Col>
                    </Row>
                </Layout.Content>
                <Layout.Footer>
                    <a href="#" onClick={this.handleClick}>
                        <Button>get scene ref</Button>
                    </a>
                </Layout.Footer>
            </Layout>
            </Provider>
        );
    }
}
