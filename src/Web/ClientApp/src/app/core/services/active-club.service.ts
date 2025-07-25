import {Injectable, signal, Signal} from '@angular/core';
import {ClubDto} from "../../web-api-client";

@Injectable({
  providedIn: 'root'
})
export class ActiveClubService {
  private readonly activeClubSignal = signal<ClubDto | null>(null);
  public readonly activeClub = this.activeClubSignal.asReadonly();


  public setActiveClub(clubDto: ClubDto): void {
    this.activeClubSignal.set(clubDto);
  }

  public clearActiveClub(): void {
    this.activeClubSignal.update(null);
  }
}
