import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-fragment',
  templateUrl: './fragment.component.html',
  styleUrls: ['./fragment.component.scss']
})
export class FragmentComponent implements OnInit {
  authorName: string = '';
  title: string = '';
  lines: string[] = [];
  constructor(private route: ActivatedRoute, private apiservice: apiService) { }

  ngOnInit(): void {
    this.authorName = this.route.snapshot.paramMap.get('name') || '';
    this.title = this.route.snapshot.paramMap.get('title') || '';

    this.apiservice.getFragmentByTitle(this.title).subscribe((data: any) => {
      if (data && data.length > 0) {
        const work = data.find((item: any) => item.title === this.title);
        if (work) {
          this.lines = work.lines;
        }
      }
    });
    
  }

}
