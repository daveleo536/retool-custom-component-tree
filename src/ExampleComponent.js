import React, { Component } from 'react';
import SortableTree, { addNodeUnderParent, getFlatDataFromTree, removeNodeAtPath } from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
//add comment here
export default class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [
        { title: 'Chicken', children: [{ title: 'Egg' }] },
        { title: 'Fish', children: [{ title: 'fingerline' }] },
      ],
    };
  }

  render() {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.props.model.treeData}
          onChange={treeData => this.props.updateModel({treeData})}
          generateNodeProps={({ node, path }) => ({
            buttons: [
                <button
                  onClick={() =>
                    this.props.updateModel({
                      treeData: addNodeUnderParent({
                        treeData: this.props.model.treeData,
                        parentKey: path[path.length - 1],
                        expandParent: true,
                        getNodeKey,
                        newNode: {
                          title: `New Node`,
                          id: 123
                        },
                        //addAsFirstChild: state.addAsFirstChild,
                      }).treeData,
                    })
                  }
                >
                Add Child
                </button>,
              <button
              onClick={() =>
                this.props.updateModel({
                  selectedNode: node.id
                })
              }
              >
              Select
              </button>,
            <button
            onClick={() =>
              this.props.updateModel({
                treeData: removeNodeAtPath({
                  treeData: this.props.model.treeData,
                  path,
                  getNodeKey,
                }),
              })
            }
          >
            Remove
          </button>,
              
            ],
          })}
        />
      </div>
    );
  }
}