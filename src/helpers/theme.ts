import { BehaviorSubject } from 'rxjs';

export class ThemeService {
  static instance: ThemeService;
  themes: Theme[] = [{
    primary: '#17484B',
    secondary: '#088D66',
    background: '#ffffff',
    error: '#ff0000',
    warning: '#aa0000',
    info: '#7CC27B',
  }];
  public readonly selectedTheme$ = new BehaviorSubject<Theme>(null);

  constructor(themes?: Theme[]) {
    if (themes) {
      this.themes.concat(themes);
    }
    this.selectedTheme$.next(this.themes[0]);
    if (ThemeService.instance) {
      return ThemeService.instance;
    } else {
      ThemeService.instance = this;
    }
  }

  selectTheme = (themeIndex: number) => {
    if (!themeIndex) throw Error('themeIndex cannot be null');
    this.selectedTheme$.next(this.themes[themeIndex]);
    localStorage.setItem('theme', themeIndex.toString());
  }
}

export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  error: string;
  warning: string;
  info: string;
}