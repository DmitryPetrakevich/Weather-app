import styles from "./WeatherCard.module.css"
import { getWeatherInfo } from "../../utils/weatherHelpers"
import { formatWeatherDate } from "../../utils/formatWeatherDate"

interface WeatherProps {
    temperature: number
    weatherCode: number | string
    tempMin: number
    tempMax: number
    date: string
}

function WeatherCard({temperature, weatherCode, tempMin, tempMax, date}: WeatherProps) {
    const { description, icon } = getWeatherInfo(weatherCode)

    return (
        <div className={styles.card}>
            <div className={styles.cardTop}>
                <div>
                    <p className={styles.cardDate}>{formatWeatherDate(date)}</p>
                    <p>Температура {temperature}</p>
                </div>

                 <div className={styles.cardTemperature}>
                    <p className={styles.cardTemperatureMin}>+ {tempMin}</p>
                    <p className={styles.cardTemperatureMax}>+ {tempMax}</p>
                </div>
            </div>
            
                <div>
                    <img
                    src={`/src/assets/icons/${icon}.svg`}
                    alt={description}
                    width={70}
                    height={70}
                    className="cardIcon"
                />
                </div>
        </div>
    )

}

export default WeatherCard;