import { OnDestroy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {PdfViewerModule} from "ng2-pdf-viewer";
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer";
import {CommonModule} from "@angular/common";
import { SafePipe } from './safe.pipe';

@Component({
  selector: 'app-visor',
  standalone: true,
  imports: [ CommonModule, SafePipe],
  templateUrl: './visor.component.html',
  styleUrl: './visor.component.scss'
})
export class VisorComponent implements OnInit, OnDestroy {

  pdfUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const filename = this.route.snapshot.params['filename'];
    if (!filename) {
      console.error("❌ No se recibió filename");
      return;
    }
    const url = `http://localhost:9090/api/ocr/viewpdf/${filename}`;

    // 🔥 CORRECTO: descargar PDF como blob
    this.http.get(url, { responseType: 'blob' }).subscribe(blob => {

      // Crear URL temporal
      this.pdfUrl = URL.createObjectURL(blob);

    });
  }
  ngOnDestroy(): void {
    if (this.pdfUrl) {
      URL.revokeObjectURL(this.pdfUrl);
    }
  }
}
