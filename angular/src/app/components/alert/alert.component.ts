import {Component, Input, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {AlertType} from '../../enum/alert-type.enum';
import {Alert} from '../../classes/alert';

@Component({
  moduleId: module.id,
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alerts: Alert[] = [];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getAlert().subscribe((alert: Alert) => {
      if (!alert) {
        // clear alerts when an empty alert is received
        this.alerts = [];
        return;
      }

      // add alert to array
      this.alerts.push(alert);
    });
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    // return css class based on alert type
    switch (alert.type) {
      case AlertType.Success:
        return 'alert background-success';
      case AlertType.Error:
        return 'alert background-danger';
      case AlertType.Info:
        return 'alert background-info';
      case AlertType.Warning:
        return 'alert background-warning';
    }
  }

}
