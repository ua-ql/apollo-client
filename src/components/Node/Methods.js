import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router'
import Name from './Name'
import CallMethod from './CallMethod';
import Method from './Method';

const MyNodeQuery = gql`query q(
  $id: String!, 
) { 
  uaNode(id: $id) {
    id
    references(
      browseDirection: Forward
      nodeClasses: [Method]
    ) {
      references {
        id
        nodeId {
          uaNode {
            id
            executable {
              value 
            }
          }
        }
        displayName {
          text
        }
      }
    }
  } 
}`;
const _Methods = ({id, data: { uaNode }={}})=>
  <ul style={{ fontWeight:'bold' }}>
    {uaNode 
      && uaNode.references
      && uaNode.references.references
      && uaNode.references.references.map(r=>
        <li key={r.id}>
          <Link to={r.nodeId.uaNode.id}>
            {r.displayName.text} 
            {r.nodeId.uaNode.executable.value && 'execute'}
            <CallMethod id={r.nodeId.uaNode.id}/>
          </Link>
          <Method id={id} methodId={r.nodeId.uaNode.id}/>
          
        </li>
      ) }
  </ul>

const Methods = compose(
  graphql(MyNodeQuery)
)(_Methods)

export default Methods;
