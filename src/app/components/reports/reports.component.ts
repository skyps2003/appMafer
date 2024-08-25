import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../services/helpers/notification-service.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent {
  public reportForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notification: NotificationService,
    private reportService: ReportService
  ) {
    this.reportForm = this.fb.group({
      start_date: [null],
      end_date: [null],
    });
  }

  generateReport(): void {
    const { start_date, end_date } = this.reportForm.value;

    if (start_date && end_date) {
      this.reportService.getSalesReport(start_date, end_date).subscribe(
        (response) => {
          
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'reporte_ventas.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          
          this.notification.showSuccessToast('Reporte generado correctamente');
        },
        (error) => {
          console.error('Error al generar el reporte:', error);
          this.notification.showErrorToast('Error al generar el reporte');
        }
      );
    } else {
      this.notification.showErrorToast('Por favor, selecciona ambas fechas.');
    }
  }
}
