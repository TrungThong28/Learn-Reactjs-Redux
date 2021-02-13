import react, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {
    //Khai báo constructor để lưu dữ liệu
    constructor(props) {
      super(props);
    
      this.state = {
        id : '',
        name : '',
        status : false
      };
    }

    componentDidMount(){
        if (this.props.itemEditing && this.props.itemEditing.id !== null) {
            this.setState({
                id : this.props.itemEditing.id,
                name : this.props.itemEditing.name,
                status : this.props.itemEditing.status
            });
        } else {
            this.onClear();
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps && nextProps.itemEditing) {
            this.setState({
                id : nextProps.itemEditing.id,
                name : nextProps.itemEditing.name,
                status : nextProps.itemEditing.status
            });
        }
    }

    //Đóng mở form
    onClose = () => {
        this.props.onCloseForm();
    }

    //lấy dữ liệu của form
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        //ep kieu du lieu sang boolean
        // if (name === 'status') {
        //     value = JSON.parse('true') ? true : false;
        // }
        this.setState({
            [name] : value
        });
    }

    //khi nguoi dung submit du lieu
    onSave = (event) => {
        //bo submit mac dinh
        event.preventDefault();
        this.props.onSaveTask(this.state);
        //huy va dong form
        this.onClear();
        this.onClose();
    }

    //Them xong du lieu thi se xoa va dong thoi dong form
    onClear = () => {
        this.setState({
            name : '',
            status : false
        });
    }

  render() {
    var id = this.state.id;
    if (!this.props.isDisplayForm) {
        return null;
    }
      return (
            <div className="panel panel-warning">
                    <div className="panel-heading">
                    <h3 className="panel-title">
                        { id !== ''? 'Cập nhật công việc' : 'Thêm công việc' } 
                        <span 
                            className="fa fa-times-circle text-right close"
                            onClick={ this.onClose }
                        ></span>
                    </h3>
                    </div>

                <div className="panel-body">
                    <form onSubmit={this.onSave} >
                        <div className="form-group">
                            <label>Tên :</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select 
                                className="form-control" 
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}
                            >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                            <button 
                                type="button"
                                className="btn btn-danger"
                                onClick={this.onClear}
                            >
                                Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
            );
        }
    }

    const mapStateToProps = (state) => {
        return {
            isDisplayForm : state.isDisplayForm,
            itemEditing : state.itemEditing
        }
    };

    const mapDispatchToProps = (dispatch, props) => {
        return {
            onSaveTask : (task) => {
                dispatch(actions.saveTask(task));
            },
            onCloseForm : () => {
                dispatch(actions.closeForm());
            }
        }
    };
export default connect(mapStateToProps, mapDispatchToProps) (TaskForm);
