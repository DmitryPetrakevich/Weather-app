import styles from "./WeatherCard.module.css"

function WeatherCard() {

    return (
        <div className={styles.card}>
            <div className={styles.cardTop}>
                <div>
                    <p>Вт, 18 августа</p>
                    <p>Сегодня</p>
                </div>

                <div>Я солнышко</div>
            </div>
            
            <div>
                Я снизу 
            </div>
        </div>
    )

}

export default WeatherCard;