import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightWord]'
})
export class HighlightWordDirective implements OnChanges{
  @Input() searchedWord: string ='';
  @Input() originalWord: string ='';

  constructor(private elementRef:ElementRef, private renderer:Renderer2) {
  }

  ngOnChanges(): void {
    let newContent = this.originalWord;
    
    if(this.searchedWord){
      newContent = this.highlighWord(this.originalWord,this.searchedWord);
    }

    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerHTML',
      newContent
    );
    return;
  }

  highlighWord(originalValue:string, searchedWord:string) {
    const re = new RegExp(`(${searchedWord})`, 'gi');
    return originalValue.replace(re, `<b>$1</b>`);
  }

}
