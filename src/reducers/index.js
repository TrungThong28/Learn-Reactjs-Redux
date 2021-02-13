import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import itemEditing from './itemEditing';
import filterTask from './filterTask';
import search from './search';
import sort from './sort';

const myReducers = combineReducers({
	tasks : tasks,
	isDisplayForm : isDisplayForm,
	itemEditing : itemEditing,
	filterTask : filterTask,
	search : search,
	sort : sort
});

export default myReducers;