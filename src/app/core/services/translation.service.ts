import { LOCATION_INITIALIZED } from '@angular/common';
import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor() { }

  public init(translateService: TranslateService, injector: Injector): Promise<void> {
    return new Promise<void>((resolve: any) => {
      // Récupérer le token LOCATION_INITIALIZED
      injector.get(LOCATION_INITIALIZED, Promise.resolve(null)).then(() => {
        const navigatorLanguage: string = window.navigator.language
        const userLanguage: string = navigatorLanguage.split('-')[0]

        const language = /(fr|en)/gi.test(userLanguage) ? userLanguage : 'fr'

        console.log(`Locations was loaded, localizations are toggled to ${language}`)

        translateService.use(language)
      })
      resolve(null)
    })
  }
}
