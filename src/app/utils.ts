import { WeatherCardData } from "./interfaces/weather-card.model";

export class Utils {
    favourites: WeatherCardData[] = [];
    temp: WeatherCardData[] = [];
    recentSearch: WeatherCardData[] = [];

    removeFromFavourite(weatherData: WeatherCardData) {
        console.log();
        this.favourites = JSON.parse(localStorage.getItem('favourites')!);
        this.recentSearch = JSON.parse(localStorage.getItem('recentSearch')!);

        for (let i = 0; i < this.favourites.length; i++) {
            if (this.favourites[i]['cityName'] != weatherData.cityName) {
                this.temp.push(this.favourites[i])
            }
        }
        localStorage.removeItem('favourites');
        localStorage.setItem('favourites', JSON.stringify(this.temp))
        console.log(this.temp);
        this.temp = [];
        for (let i = 0; i < this.recentSearch.length; i++) {
            if (this.recentSearch[i].cityName === weatherData.cityName) {
                this.recentSearch[i].isFavourite = false;
            }

        }
        localStorage.removeItem('recentSearch');
        localStorage.setItem('recentSearch', JSON.stringify(this.recentSearch));

    }
    addToFavourite(favouriteData: WeatherCardData) {
        console.log();
        this.favourites, this.recentSearch = [], [];
        if (localStorage.getItem('favourites') != null)
            this.favourites = JSON.parse(localStorage.getItem('favourites')!);
        if (localStorage.getItem('recentSearch') != null)
            this.recentSearch = JSON.parse(localStorage.getItem('recentSearch')!);

        this.favourites.push({
            cityName: favouriteData.cityName,
            temperature: Number.parseInt(favouriteData.temperature).toString(),
            weatherDescription: favouriteData.weatherDescription,
            icon: favouriteData.icon,
            isFavourite: true,
            weatherData: favouriteData.weatherData
        });
        localStorage.removeItem('favourites');
        localStorage.setItem('favourites', JSON.stringify(this.favourites));

        for (let i = 0; i < this.recentSearch.length; i++) {
            if (this.recentSearch[i].cityName === favouriteData.cityName) {
                this.recentSearch[i].isFavourite = true;
            }

        }
        localStorage.removeItem('recentSearch');
        localStorage.setItem('recentSearch', JSON.stringify(this.recentSearch));

    }

    removeFromRecentSearch(weatherData: WeatherCardData) {
        console.log();
        this.recentSearch = JSON.parse(localStorage.getItem('recentSearch')!);
        for (let i = 0; i < this.favourites.length; i++) {
            if (this.recentSearch[i]['cityName'] != weatherData.cityName) {
                this.temp.push(this.recentSearch[i])
            }
        }
        localStorage.removeItem('recentSearch');
        localStorage.setItem('recentSearch', JSON.stringify(this.temp))
        console.log(this.temp);
    }

    addToRecentSearch(recentSearchData: WeatherCardData) {
        if (this.isAddedToRecentSearch(recentSearchData.cityName)) {
            return;
        }
        if (this.isAddedToFavourite(recentSearchData.cityName)) {
            recentSearchData.isFavourite = true;
        }
        this.recentSearch = [];
        if (localStorage.getItem('recentSearch') != null)
            this.recentSearch = JSON.parse(localStorage.getItem('recentSearch')!);
        this.recentSearch.push(recentSearchData);
        localStorage.removeItem('recentSearch');
        localStorage.setItem('recentSearch', JSON.stringify(this.recentSearch))

    }

    isAddedToFavourite(cityName: string): boolean {
        if (localStorage.getItem('favourites') == null) {
            return false;
        }
        this.favourites = JSON.parse(localStorage.getItem('favourites')!);
        for (let i = 0; i < this.favourites.length; i++) {
            if (this.favourites[i].cityName.toLowerCase() === cityName.toLowerCase())
                return true;
        }
        return false;
    }
    isAddedToRecentSearch(cityName: string): boolean {
        if (localStorage.getItem('recentSearch') == null) {
            return false;
        }
        this.recentSearch = JSON.parse(localStorage.getItem('recentSearch')!);
        for (let i = 0; i < this.recentSearch.length; i++) {
            if (this.recentSearch[i].cityName.toLocaleLowerCase() === cityName.toLocaleLowerCase())
                return true;
        }
        return false;
    }
}

