import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {alertService, AlertType, IAlert} from '../services/'
import {Container} from "react-bootstrap";

interface Props {
    id?: string
    fade?: boolean
}

const Alert = ({ id = 'default-alert', fade = true }: Props) => {
    const router = useRouter()
    const [alerts, setAlerts] = useState<IAlert[]>([])
    useEffect(() => {
        const subscription = alertService.onAlert(id)
            .subscribe(alert => {
                if (!alert.message) {
                    setAlerts(alerts => {
                        const filteredAlerts = alerts.filter(x => x.keepAfterRouteChange)
                        filteredAlerts.forEach(x => delete x.keepAfterRouteChange)
                        return filteredAlerts
                    })
                } else {
                    setAlerts(alerts => ([...alerts, alert as IAlert]))
                    if (alert.autoClose) {
                        setTimeout(() => removeAlert(alert as IAlert), 3000)
                    }
                }
            })
        const onRouteChange = () => alertService.clear(id)
        router.events.on('routeChangeStart', onRouteChange)
        return () => {
            subscription.unsubscribe()
            router.events.off('routeChangeStart', onRouteChange)
        }
    }, [])

    const removeAlert = (alert: IAlert) => {
        if (fade) {
            const alertWithFade = {...alert, fade: true}
            setAlerts(alerts => alerts.map(x => x === alert ? alertWithFade : x))
            setTimeout(() => {
                setAlerts(alerts => alerts.filter(x => x !== alertWithFade))
            }, 250)
        } else {
            setAlerts(alerts => alerts.filter(x => x !== alert))
        }
    }
    const cssClasses = (alert: IAlert) => {
        if (!alert) return
        const classes = ['alert', 'alert-dismissable']
        const alertTypeClass = {
            [AlertType.Success]: 'alert-success',
            [AlertType.Error]: 'alert-danger',
            [AlertType.Info]: 'alert-info',
            [AlertType.Warning]: 'alert-warning'
        }
        classes.push(alertTypeClass[alert.type])
        if (alert.fade) {
            classes.push('fade')
        }
        return classes.join(' ')
    }
    if (!alerts.length) return null

    return (
        <Container>
            <div className="m-3">
                {alerts.map((alert, index) =>
                    <div key={index} className={cssClasses(alert)}>
                        <a className="close" onClick={() => removeAlert(alert)}>&times;</a>
                        <span dangerouslySetInnerHTML={{__html: alert.message}}></span>
                    </div>
                )}
            </div>
        </Container>
    )

}
export default Alert
