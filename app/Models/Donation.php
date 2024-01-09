<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Exceptions\InputException;

class Donation extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'user_id',
        'campaign_id',
        'amount',
    ];

    public static function fromId(int $id): self
    {
        return self::where('id', $id)->first();
    }

    public function getUuid(): string
    {
        return $this->uuid;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getUserId(): int
    {
        return $this->user_id;
    }

    public function getUser(): User
    {
        return User::fromId($this->getUserId());
    }

    public function getCampaignId(): int
    {
        return $this->campaign_id;
    }

    public function getCampaign(): Campaign
    {
        return Campaign::fromId($this->getCampaignId());
    }

    public function getAmount(): string
    {
        return (string) $this->amount;
    }

    public function setAmount(string $amount): void
    {
        if (!is_numeric($amount) || $amount < 0) {
            throw new InputException('Invalid amount provided');
        }
    
        $this->amount = number_format($amount, 2, '.', '');
        $this->save();
    }
}
