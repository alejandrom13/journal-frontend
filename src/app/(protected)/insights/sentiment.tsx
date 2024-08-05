import React from 'react';

const SentimentCard = (data: any) => {
    return (
        <div>
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>

            {data?.map((item: any, index: any) => {
                <>
                    <div className="h-10 text-black" key={index}>
                        {item.feeling}
                        {item.score}
                    </div>
                </>;
            })}

        </div>
    );
};

export default SentimentCard
