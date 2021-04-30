import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Game, GameCategory } from './movies-feed.types';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesfeedService } from './movies-feed.service';
import { first } from 'rxjs/operators';
import { untilDestroyed } from '@app/shared/until-destroyed';
import { uniq as _uniq } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionDialogComponent } from './components/create-user/description-dialog.component';

@Component({
  selector: 'jg-games',
  templateUrl: './movies-feed.component.html',
  styleUrls: ['./movies-feed.component.scss'],
})
export class MoviesFeedComponent implements OnInit, OnDestroy {
  numb = 123123;
  allGames: Game[] = [];
  gamesInCurrentCategory: Game[] = [];
  currentCategory: GameCategory;
  gameCategories = Object.values(GameCategory);
  otherCategories: Record<string, boolean> = {};
  constructor(
    private route: ActivatedRoute,
    private service: GamesfeedService,
    private readonly router: Router,
    readonly dialog: MatDialog,
    private readonly http: HttpClient,
  ) {}

  async ngOnInit() {
    // console.log(environment.production);
    // this.http.get('http://stage.whgstage.com/api').subscribe((thing) => {
    //   console.log(thing);
    // });

    this.http.get<string>('/').subscribe((thing) => {
      console.log('thing');
      console.log(thing);
    });
    this.route.params.pipe(untilDestroyed(this)).subscribe((params) => {
      const isValidCategory = this.gameCategories.includes(params['gameType']);
      if (!isValidCategory) {
        this.router.navigate(['/games', 'top']);
      }

      this.currentCategory = params['gameType'];

      const gamesAlreadyLoaded = !!this.allGames.length;
      if (gamesAlreadyLoaded) {
        this.gamesInCurrentCategory = this.getGamesInCurrentCategory();
      }
    });

    const [games, jackpots] = await Promise.all([
      this.service.fetchGameList().pipe(first()).toPromise(),
      this.service.fetchJackpots().pipe(first()).toPromise(),
    ]);

    const gameIdsWithJackpot: Record<string, number> = jackpots.reduce(
      (accumulator, jackpot) => ({
        ...accumulator,
        [jackpot.game]: jackpot.amount,
      }),
      {},
    );

    this.allGames = games.map((game) => ({
      ...game,
      isNew: game.categories.includes(GameCategory.NewGames),
      jackpot: gameIdsWithJackpot[game.id],
    }));
    this.otherCategories = this.getOtherCategories();
    this.gamesInCurrentCategory = this.getGamesInCurrentCategory();
    this.openDescriptionDialog();
  }

  ngOnDestroy() {
    // ngOnDestroy is needed for untilDestroyed
  }

  getGamesInCurrentCategory() {
    const requestsGamesWithJackpot =
      this.currentCategory === GameCategory.Jackpot;
    if (requestsGamesWithJackpot) {
      return this.allGames.filter((game) => !!game.jackpot);
    }

    const otherCategory = this.currentCategory === GameCategory.Other;
    if (otherCategory) {
      return this.getGamesInOtherCategs();
    }

    return this.allGames.filter((game) =>
      game.categories.includes(this.currentCategory),
    );
  }

  getOtherCategories() {
    let allCategories = this.allGames.reduce(
      (acc: string[], game) => [...acc, ...game.categories],
      [],
    );
    allCategories = _uniq(allCategories);

    const otherCategoriesArr = allCategories.filter(
      (category) => !this.gameCategories.includes(category as GameCategory),
    ) as GameCategory[];
    return otherCategoriesArr.reduce(
      (acc, otherCateg) => ({
        ...acc,
        [otherCateg]: true,
      }),
      {},
    );
  }

  getGamesInOtherCategs() {
    return this.allGames.reduce((acc: Game[], game) => {
      const isGameInOtherCategs = game.categories.filter(
        (category) => this.otherCategories[category],
      ).length;
      if (isGameInOtherCategs) {
        return [...acc, game];
      }

      return acc;
    }, []);
  }

  openDescriptionDialog() {
    this.dialog.open(DescriptionDialogComponent, {
      autoFocus: false,
    });
  }
}
