import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-visor',
  standalone: true,
  imports: [NgxExtendedPdfViewerModule, CommonModule],
  templateUrl: './visor.component.html',
  styleUrl: './visor.component.scss'
})
export class VisorComponent implements OnInit {

  pdfUrl: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    const url = `http://localhost:9090/api/ocr/exportdb/${id}`;

    // 🔥 CORRECTO: descargar PDF como blob
    this.http.get(url, { responseType: 'blob' }).subscribe(blob => {

      // Crear URL temporal
      this.pdfUrl = URL.createObjectURL(blob);

    });
  }
}
