import { BehaviorSubject } from 'rxjs';

export class ThemeService {
  static instance: ThemeService;
  themes: Theme[] = [{
    primary: '#00A6A6',
    secondary: '#F49F0A',
    default: '#FFFFFF',
    sideBar: '#102542',
    error: '#ff0000',
    warning: '#F09266',
    info: '#67A57F',
  }];
  public readonly selectedTheme$ = new BehaviorSubject<Theme>(null);

  constructor(themes?: Theme[]) {
    if (themes) {
      this.themes.concat(themes);
    }
    this.selectedTheme$.next(this.themes[0]);
    if (ThemeService.instance) {
      ThemeService.instance.themes = this.themes;
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
  default: string;
  sideBar: string;
  error: string;
  warning: string;
  info: string;
}