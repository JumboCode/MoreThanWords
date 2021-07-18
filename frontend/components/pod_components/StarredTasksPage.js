import React from 'react';
import { FlatList, View } from 'react-native';
import { getAccessToken } from '../../utils/auth';
import Constants from 'expo-constants';
import StarredTask from './StarredTask';
import { RefreshControl } from 'react-native';
import { Spinner } from 'native-base';

const server_add = Constants.manifest.extra.apiUrl;

export default function StarredTasksPage() {
  const [ tasks, setTasks ] = React.useState(null);
  const [ refreshing, setRefreshing ] = React.useState(false);
  const accessible = true;

  const getStarredTasks = React.useCallback(() => {
    getAccessToken()
    .then(token => 
      fetch(server_add + "/starredTasks", {
        headers: {
          "Authorization": "bearer " + token
        }
      }))
    .then(res => {
      if (res.status === 200) {
        res.json().then(ts => {
          setTasks(ts);
          setRefreshing(false);
        });
      }
    })
  }, []);

  const handleSetTasks = React.useCallback((backendID, updatedCheckboxValue, updatedStarValue) => {
    let dataTemp = [...tasks];
    let index = dataTemp.findIndex(x => x.api_key === backendID);
    dataTemp[index].checked = updatedCheckboxValue;
    dataTemp[index].starIsFilled = updatedStarValue;
    setTasks(dataTemp);
  }, [tasks]);

  React.useEffect(getStarredTasks, []);

  return (tasks ?
    <FlatList 
      onRefresh={getStarredTasks}
      refreshing={refreshing}
      data={tasks}
      renderItem={({ item }) => 
        <StarredTask key={item.api_key} task={item} handleSetTasks={handleSetTasks}/>}
    >
    </FlatList>
    :
    <Spinner color="#C4C4C4"/>);
}