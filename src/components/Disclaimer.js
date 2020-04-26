import React from 'react'
import { faSortUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Disclaimer = ({updated}) => (
    <div>
        <div>   
            <p>اخر تحديث</p>
            <p className="date">{new Date(updated).toLocaleString('ar-eg')}</p>
            <br/>
            <p className="warning"><FontAwesomeIcon icon={faSortUp} /> احصائات اليوم *</p>
            <p className="warning">من الوارد ان تكون أرقام اليوم لم تحدث بعد</p>
        </div>
        <div className="disclaimer">
            لا يوجد حاليًا لقاح للوقاية من فيروس الكورونا، يمكنك حماية نفسك والمساعدة في منع انتشار الفيروس للآخرين 
        </div>
    </div>
)

export default Disclaimer