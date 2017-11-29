import {Component, OnInit} from "@angular/core";
import {PeopleManageModel} from "../../../theme/components/pm-peoplemanage/pm-peoplemanage.model";
import {MatDialog} from "@angular/material";
import {CommonDeleteDialog} from "../../../theme/components/deleteDialog/deleteDialog.component";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PmActivityService} from "./pm-activity.service";
import * as moment from 'moment';

@Component({
  selector: 'pm-activity',
  templateUrl: './pm-activity.component.html',
  styleUrls: ['./pm-activity.component.scss'],
  providers: [PmActivityService]
})
export class PmActivityComponent implements OnInit {
  dataListModel: PeopleManageModel[];
  members: any;
  searchList: any[] = [];
  form: FormGroup;
  projectType: any[];
  projectDetail: any;

  constructor(public dialog: MatDialog, private router: Router, private service: PmActivityService) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      detail: new FormControl(''),
      type: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required])
    });

    this.projectType = [
      { name: '短期项目', value: 'short-term'},
      { name: '长期项目', value: 'long-term'},
      { name: '运维项目', value: 'operation'},
    ];
    this.dataListModel = [
      { name: '姓名', value: 'username' },
      { name: '职位', value: 'role' },
      { name: '邮箱', value: 'email' },
    ];
  }

  ngOnInit() {
    this.getMember();
    this.getProjectDetail();
  }

  onSubmit(form: any) {
    form.status = 'active';
    form.startDate = this.dateSwitch(form.startDate);
    form.endDate = this.dateSwitch(form.endDate);
    console.log(form);
    this.service.updateProject(form)
      .then(res => {
        console.log(res)
      }, err => {
        console.log(err);
      });
  }

  dateSwitch(date: any) {
    return moment(new Date(date)).format('YYYY-MM-D h:mm:ss')
  }

  getMember() {
    this.service.getMember()
      .then(res => {
        this.members = res;
        console.log('members: ', this.members)
      }, err => {
        console.log(err);
      })
  }

  getProjectDetail() {
    this.service.getProjectDetail()
      .then(res => {
        this.projectDetail = res;
        console.log(res);
      }, err => {
        console.log(err);
      })
  }

  deleteProject() {
    let deleteDialog = this.dialog.open(CommonDeleteDialog, {
      height: '250px',
      width: '450px',
      data: '项目'
    });
    deleteDialog.afterClosed().subscribe(result => {
      if (result) {
        console.log('delete project');
        this.router.navigate(['/pages/welcome']);
      } else {
        console.log('cancel delete');
      }
    })
  }

  search(str: any) {
    if(str === 'qwer') {
      this.searchList = [
        {
          name: 'qwer',
          job: 'pm',
          email: 'qwer@hpe.com',
          date: '2017/11/23',
          id: 'sdfsdfsafas',
        },
        {
          name: 'QWER',
          job: 'dev',
          email: 'QWER@hpe.com',
          date: '2017/11/22',
          id: 'sddfsffsdd',
        }
      ];
    } else {
      this.searchList = [];
    }
  }

  delete(data: any) {
    console.log('delete: ',data)
  }

  create(data: any) {
    console.log('create: ', data)
  }
}
