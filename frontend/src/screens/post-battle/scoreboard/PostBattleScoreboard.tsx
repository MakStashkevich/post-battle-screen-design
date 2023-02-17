import React from 'react';
import style from "./PostBattleScoreboard.module.scss";

const PostBattleScoreboard = () => {
    return (
        <div className={style.scoreboard}>
            <table>
                <tr>
                    <th>#</th>
                    <th>Player</th>
                    <th>Status</th>
                    <th>Score</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Nickname</td>
                    <td>Dead</td>
                    <td>1,234,567</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Nickname</td>
                    <td>Dead</td>
                    <td>1,234,567</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Nickname</td>
                    <td>Dead</td>
                    <td>1,234,567</td>
                </tr>
            </table>
        </div>
    );
};

export default PostBattleScoreboard;